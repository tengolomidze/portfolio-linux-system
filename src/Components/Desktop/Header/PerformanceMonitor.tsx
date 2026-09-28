import { useEffect, useState } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const UPDATE_TIME = 1500;
const RANDOM_STEP = 0.2;
const LOAD_LENGTH = 60
const TEMP = 29;

const PerformanceMonitor = () => {
    const [monitorState, setMonitorState] = useState({
        temp: TEMP,
        cores: [0.4, 0.1, 0.2, 0.7],
        load: Array(LOAD_LENGTH).fill(0)
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMonitorState((prev) => {
                const nextCores = prev.cores.map((v) =>
                    clamp(v + Math.random() * RANDOM_STEP - RANDOM_STEP / 2, 0, 1)
                );

                const currentLoadValue = nextCores.reduce((sum, core) => sum + core, 0) / nextCores.length;
                const nextLoad = [
                    ...prev.load.slice(1), 
                    currentLoadValue
                ];
                return {temp: prev.temp + Math.random()*.2, cores: nextCores, load: nextLoad };
            });
        }, UPDATE_TIME);

        return () => { clearInterval(interval); };
    }, []);

    return (
        <div className="flex items-center justify-center h-2/3 gap-1">
            <p className="font-jakarta font-light text-main/90 text-sm mr-2">{Math.round(monitorState.temp)}°C</p>

            <div className="flex items-end justify-center h-full gap-0.5">
                {monitorState.cores.map((v, i) => (
                    <div 
                        key={i} 
                        style={{ height: `${v*50+10}%` }} 
                        className="bg-Red w-1 transition-[height] duration-500 ease-linear"
                    ></div>
                ))}
            </div>
            
            <div className="flex items-end justify-center h-full">
                {monitorState.load.map((v, i) => (
                    <div 
                        key={i}
                        style={{ height: `${v * 20 + 1}px` }} 
                        className="bg-Green w-px"
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default PerformanceMonitor;