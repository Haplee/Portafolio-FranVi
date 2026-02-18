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
}

interface UseGitHubDataResult {
    repos: GitHubRepo[];
    loading: boolean;
    error: string | null;
}

export function useGitHubData(username: string): UseGitHubDataResult {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }

        const fetchRepos = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`
                );

                if (!response.ok) {
                    throw new Error('No se pudieron cargar los repositorios');
                }

                const data = await response.json();
                setRepos(data);
            } catch (err) {
                console.warn('Error al cargar repos de GitHub:', err);
                setError('No se pudieron cargar los repositorios. Inténtalo más tarde.');
                setRepos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username]);

    return { repos, loading, error };
}
