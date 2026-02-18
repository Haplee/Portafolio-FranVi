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

export const useGitHubData = (username: string) => {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`),
                    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`)
                ]);

                if (!userRes.ok || !reposRes.ok) throw new Error('Failed to fetch GitHub data');

                const userData = await userRes.json();
                const reposData = await reposRes.json();

                setUser(userData);
                setRepos(reposData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (username) fetchData();
    }, [username]);

    return { user, repos, loading, error };
};
