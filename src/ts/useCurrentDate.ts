import { useState, useEffect } from 'react';

export const useCurrentDate = (updateIntervalMs: number = 10000) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), updateIntervalMs); 
        return () => clearInterval(timer);
    }, [updateIntervalMs]);

    return date;
};