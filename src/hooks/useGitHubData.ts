import { useState, useEffect } from 'react';

export interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    html_url: string;
    blog: string;
    location: string;
    bio: string;
    twitter_username: string;
    public_repos: number;
    followers: number;
    following: number;
}

export interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    pushed_at: string;
}

interface UseGitHubDataResult {
    user: GitHubUser | null;
    repos: GitHubRepo[];
    loading: boolean;
    error: string | null;
}

const MOCK_USER: GitHubUser = {
    login: 'franvidal',
    name: 'Fran Vidal',
    avatar_url: 'https://ui-avatars.com/api/?name=Fran+Vidal&background=0f172a&color=22d3ee&size=200',
    html_url: 'https://github.com',
    blog: '',
    location: 'Spain',
    bio: 'Estudiante de ASIR apasionado por la tecnología.',
    twitter_username: '',
    public_repos: 10,
    followers: 5,
    following: 5
};

const MOCK_REPOS: GitHubRepo[] = [
    {
        id: 1,
        name: 'portafolio-franvi',
        html_url: 'https://github.com',
        description: 'Mi portafolio personal construido con React, TypeScript y TailwindCSS.',
        language: 'TypeScript',
        stargazers_count: 12,
        forks_count: 2,
        pushed_at: new Date().toISOString()
    },
    {
        id: 2,
        name: 'sistema-gestion',
        html_url: 'https://github.com',
        description: 'Sistema de gestión de inventario para pymes.',
        language: 'Python',
        stargazers_count: 8,
        forks_count: 1,
        pushed_at: new Date().toISOString()
    },
    {
        id: 3,
        name: 'network-monitor',
        html_url: 'https://github.com',
        description: 'Script de monitoreo de red usando Python y Bash.',
        language: 'Python',
        stargazers_count: 5,
        forks_count: 0,
        pushed_at: new Date().toISOString()
    },
    {
        id: 4,
        name: 'docker-lab',
        html_url: 'https://github.com',
        description: 'Entorno de laboratorio virtualizado con Docker Compose.',
        language: 'Dockerfile',
        stargazers_count: 15,
        forks_count: 3,
        pushed_at: new Date().toISOString()
    },
    {
        id: 5,
        name: 'ansible-config',
        html_url: 'https://github.com',
        description: 'Playbooks de Ansible para automatización de servidores.',
        language: 'YAML',
        stargazers_count: 7,
        forks_count: 1,
        pushed_at: new Date().toISOString()
    },
    {
        id: 6,
        name: 'security-scripts',
        html_url: 'https://github.com',
        description: 'Colección de scripts para auditoría de seguridad básica.',
        language: 'Bash',
        stargazers_count: 20,
        forks_count: 5,
        pushed_at: new Date().toISOString()
    }
];

export function useGitHubData(username: string): UseGitHubDataResult {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        // If no username provided, just return mock data immediately to avoid errors
        if (!username) {
            setUser(MOCK_USER);
            setRepos(MOCK_REPOS);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`),
                    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`)
                ]);

                if (!userRes.ok || !reposRes.ok) {
                    // Fallback to mock data on error (404, rate limit, etc.)
                    console.warn('GitHub API failed, falling back to mock data.');
                    setUser(MOCK_USER);
                    setRepos(MOCK_REPOS);
                    // We don't set error here so the UI shows the mock data instead of an error message
                } else {
                    const userData = await userRes.json();
                    const reposData = await reposRes.json();
                    setUser(userData);
                    setRepos(reposData);
                }

            } catch (err) {
                console.warn('GitHub API network error, falling back to mock data.', err);
                setUser(MOCK_USER);
                setRepos(MOCK_REPOS);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    return { user, repos, loading, error };
}
