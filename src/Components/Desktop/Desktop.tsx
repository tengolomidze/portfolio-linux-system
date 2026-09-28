import { useCurrentDate } from '../../ts/useCurrentDate'
import { useSelector } from 'react-redux'
import { type RootState } from '../../state/store'
import { AppState } from '../../ts/states'

import Header from './Header/Header'
import DesktopSpace from './DesktopSpace'
import "./Desktop.css"
import { PRELOAD } from '../PreLoader'


export default function Desktop () {
    const appState = useSelector((state: RootState) => state.system.appState)
    const now = useCurrentDate();

    const preloader = useSelector((state: RootState) => state.preloader)


    if (appState === AppState.Kernel) return null;
    return (
        <>
            <div className="fixed -z-20 inset-0 w-dvw h-dvh bg-black pointer-events-none">
                {/* <img 
                    className="w-full h-full object-cover brightness-90"
                    src="/images/ng.png"
                /> */}

                <video
                    className="w-full h-full object-cover brightness-90"
                    src={preloader.assets[PRELOAD.DESKTOP_BG]?.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>

            <div className="fixed top-24 right-16 -z-10 inset-0 flex items-start justify-end pointer-events-none">
                <div className='flex flex-col items-center justify-center text-Red uppercase gap-2'>
                    <p className='text-8xl font-anurati font-medium'>{now.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    <p className='text-2xl font-anurati font-bold tracking-widest'>{now.toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/,/g, '')}</p>
                    <p className='text-xl font-anurati font-bold tracking-widest leading-4'>- {now.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true })} -</p>
                </div>
            </div>

            <Header />
            <DesktopSpace />
        </>
    )
}