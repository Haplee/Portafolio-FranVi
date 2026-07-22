import { useState, useEffect } from 'react';

export interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    pushed_at: string;
    homepage: string;
    topics: string[];
    updated_at: string;
}

interface UseGitHubDataResult {
    repos: GitHubRepo[];
    loading: boolean;
    error: string | null;
}

// Caché a nivel de módulo: la API pública de GitHub limita a 60 req/hora por IP,
// así que varias secciones (Stats, Projects) comparten una única petición.
const cache = new Map<string, GitHubRepo[]>();
const inflight = new Map<string, Promise<GitHubRepo[]>>();

function loadRepos(username: string): Promise<GitHubRepo[]> {
    const cached = cache.get(username);
    if (cached) return Promise.resolve(cached);

    const pending = inflight.get(username);
    if (pending) return pending;

    const request = (async () => {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`
        );
        if (!response.ok) {
            throw new Error('No se pudieron cargar los repositorios');
        }
        const data = await response.json();
        // La API devuelve un objeto (no un array) ante errores/rate-limit; validarlo
        // evita que `.reduce`/`.map` revienten más abajo.
        if (!Array.isArray(data)) {
            throw new Error('Respuesta inesperada de la API de GitHub');
        }
        cache.set(username, data as GitHubRepo[]);
        return data as GitHubRepo[];
    })();

    inflight.set(username, request);
    request.finally(() => inflight.delete(username));
    return request;
}

export function useGitHubData(username: string): UseGitHubDataResult {
    const [repos, setRepos] = useState<GitHubRepo[]>(() => cache.get(username) ?? []);
    const [loading, setLoading] = useState(() => !cache.has(username));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }

        let active = true;
        setLoading(true);
        setError(null);

        loadRepos(username)
            .then((data) => {
                if (active) setRepos(data);
            })
            .catch((err) => {
                if (!active) return;
                console.warn('Error al cargar repos de GitHub:', err);
                setError('No se pudieron cargar los repositorios. Inténtalo más tarde.');
                setRepos([]);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [username]);

    return { repos, loading, error };
}
