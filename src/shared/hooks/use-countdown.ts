import { useEffect, useState } from 'react';

export type Countdown = {
    d: number;
    h: number;
    m: number;
    s: number;
    expired: boolean;
};

export function useCountdown(target?: Date): Countdown {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    if (!target) return { d: 0, h: 0, m: 0, s: 0, expired: false };

    const diff = +target - +now;
    const expired = diff <= 0;
    const total = Math.max(0, Math.floor(diff / 1000));
    const d = Math.floor(total / (3600 * 24));
    const h = Math.floor((total % (3600 * 24)) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    return { d, h, m, s, expired };
}