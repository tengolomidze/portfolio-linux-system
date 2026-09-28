import React, { useEffect } from 'react'
import { useCurrentDate } from '../../ts/useCurrentDate';


export default function Locked ({isSignIn, setIsSignIn}:{
        isSignIn: boolean
        setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>
    }) {
    const now = useCurrentDate()

    useEffect(() => {
        if (isSignIn) return

        function keyDownHandler (e: globalThis.KeyboardEvent) {
            if (!isSignIn) {
                e.preventDefault()
                setIsSignIn(true)
            }
        }

        document.addEventListener("keydown", keyDownHandler)
        return () => {document.removeEventListener("keydown", keyDownHandler)}
    }, []);

    return (
        <div onClick={() => setIsSignIn(true)} onKeyUp={() => setIsSignIn(true)}
            className='flex flex-col items-center justify-center gap-24 fixed top-0 left-0 bottom-0 right-0 z-30'>
            <div/>

            <div className="flex flex-col items-center justify-center gap-6">
                <p className='text-8xl text-zinc-100 font-jakarta font-extralight tracking-widest'>
                    {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }
                </p>
                <p className='text-3xl text-zinc-100 font-jakarta font-extralight tracking-wide'>
                    {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <p className='text-md text-zinc-100/70 font-jakarta font-extralight tracking-normal'>Click or press a key to unlock</p>
        </div>
    )
}