import { useEffect, useState } from 'react';

export interface ContribDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface UseContribResult {
    days: ContribDay[];
    total: number;
    loading: boolean;
    error: string | null;
}

export function useGitHubContributions(username: string): UseContribResult {
    const [days,    setDays]    = useState<ContribDay[]>([]);
    const [total,   setTotal]   = useState(0);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState<string | null>(null);

    useEffect(() => {
        if (!username) { setLoading(false); return; }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setDays(data.contributions ?? []);
                setTotal(data.total?.lastYear ?? data.total ?? 0);
            } catch (err) {
                console.warn('GH contribs error:', err);
                setError('No se pudieron cargar contribuciones');
                setDays([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [username]);

    return { days, total, loading, error };
}
