import React, { useState } from 'react';
import { AppState, LockedScreenButtonsState } from '../../ts/states'
import { setAppState, setMusicState, setVolume, musicNext, musicPrevious } from "../../state/slices/SystemSlice"; 
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../state/store'

import { CiPower, CiRedo, CiDark, CiVolumeHigh, CiWifiOn,  } from "react-icons/ci";
import { RxPlay, RxPause, RxTrackPrevious, RxTrackNext   } from "react-icons/rx";
import { FaHeadphones } from "react-icons/fa6";

const POWER_BUTTONS_CLASS = "w-full flex items-center justify-start gap-1.5 text-white text-sm font-funnel-sans font-light pl-3 py-2 rounded-lg bg-black/0 hover:bg-black/20 duration-150"

export default function Buttons ({buttonsState, setButtonsState}:{
        buttonsState: LockedScreenButtonsState,
        setButtonsState: React.Dispatch<React.SetStateAction<LockedScreenButtonsState>>,
    }) {

    return (
        <div className='fixed top-3 right-4 z-40 rounded-lg bg-white/10'>
            <div className='relative flex items-center justify-end py-0.5 px-1 gap-1'>
                <Wifi buttonsState={buttonsState} setButtonsState={setButtonsState}/> 
                <Music buttonsState={buttonsState} setButtonsState={setButtonsState}/>
                <Power buttonsState={buttonsState} setButtonsState={setButtonsState}/> 
            </div>
        </div>
    )
}

function Wifi ({buttonsState, setButtonsState}:{
        buttonsState: LockedScreenButtonsState,
        setButtonsState: React.Dispatch<React.SetStateAction<LockedScreenButtonsState>>,
    }) {
    return (
        <div className="relative">
            <div onClick={() => {
                    buttonsState !== LockedScreenButtonsState.Wifi ?
                    setButtonsState(LockedScreenButtonsState.Wifi) :
                    setButtonsState(LockedScreenButtonsState.Closed)
                }}  
                className="relative p-1.5 rounded-md bg-black/0 hover:bg-black/30 duration-200">
                    <CiWifiOn className="text-white text-2xl"/>
                </div>
        </div>
    )
}

function Power ({buttonsState, setButtonsState}:{
        buttonsState: LockedScreenButtonsState,
        setButtonsState: React.Dispatch<React.SetStateAction<LockedScreenButtonsState>>,
    }) {
    const dispatch = useDispatch()

    return (
        <>
            <div onClick={() => {
                    buttonsState !== LockedScreenButtonsState.Power ?
                    setButtonsState(LockedScreenButtonsState.Power) :
                    setButtonsState(LockedScreenButtonsState.Closed)
                }} 
                className="p-1.5 rounded-md bg-black/0 hover:bg-black/30 duration-200">
                    <CiPower  className="text-white text-2xl"/>
            </div>

            <div className={`absolute top-12 right-0 w-32 overflow-hidden ${buttonsState === LockedScreenButtonsState.Power ? "block" : "hidden"}`}>
                <div className={`bg-white/10 rounded-xl backdrop-blur-md w-full h-full flex flex-col items-center justify-center gap-1 p-1.5 ${buttonsState === LockedScreenButtonsState.Power ? "animate-button-slide-down" : ""}`}>
                    <div onClick={() => {setButtonsState(LockedScreenButtonsState.Closed)}} className={POWER_BUTTONS_CLASS}><CiDark  className="text-xl"/> Sleep</div>
                    <div onClick={() => {setButtonsState(LockedScreenButtonsState.Closed); dispatch(setAppState(AppState.Kernel))}} className={POWER_BUTTONS_CLASS}><CiRedo  className="text-xl"/> Restart</div>
                    <div onClick={() => {setButtonsState(LockedScreenButtonsState.Closed)}} className={POWER_BUTTONS_CLASS}><CiPower className="text-xl"/> Shut down</div>
                </div>
            </div>  
        </>
    )
}

function Music ({buttonsState, setButtonsState}:{
        buttonsState: LockedScreenButtonsState,
        setButtonsState: React.Dispatch<React.SetStateAction<LockedScreenButtonsState>>
    }) {

    const music = useSelector((state: RootState) => state.system.music)
    const volume = useSelector((state: RootState) => state.system.volume)
    const dispatch = useDispatch()

    return (
        <>
            <div onClick={() => {
                    buttonsState !== LockedScreenButtonsState.Volume ?
                    setButtonsState(LockedScreenButtonsState.Volume) :
                    setButtonsState(LockedScreenButtonsState.Closed)
                }} 
                className="p-1.5 rounded-md bg-black/0 hover:bg-black/30 duration-200">
                    <CiVolumeHigh className="text-white text-2xl"/>
            </div>

            <div className={`absolute top-12 right-0 w-72 overflow-hidden gap-2 flex flex-col items-center justify-center ${buttonsState === LockedScreenButtonsState.Volume ? "block animate-button-slide-down" : "hidden"}`}>
                <div className={`w-full h-full rounded-lg bg-white/10 backdrop-blur-md`}>
                    <div className='relative px-2 py-2 flex flex-col items-center justify-center gap-4'>
                        <div className="absolute inset-0 rounded-lg overflow-hidden">
                            <div 
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-125 brightness-50 opacity-90"
                                style={{backgroundImage: `url('/music/${music.list[music.current].name}.png')`}}
                            />
                        </div>
                        
                        <div className="relative w-full flex items-center justify-start gap-4 pl-4 py-2">
                            <img src={`/music/${music.list[music.current].name}.png`} className="h-22 w-22 rounded-md"/>

                            <div className="h-22 flex flex-col items-start justify-between py-2">
                                <div className='flex flex-col items-start justify-between'>
                                    <p className="text-white text-md font-semibold font-funnel-sans">{music.list[music.current].name}</p>
                                    <p className="text-zinc-300 text-xs font-light font-funnel-sans">{music.list[music.current].author}</p>
                                </div>
                                <div className="relative w-full flex items-center justify-start gap-4">
                                    <RxTrackPrevious onClick={() => dispatch(musicPrevious())} className="text-white text-xl hover:text-white/80 duration-200"/>
                                    {music.active ? 
                                        <RxPause   onClick={() => dispatch(setMusicState(!music.active))} className="text-white text-2xl hover:text-white/80 duration-200"/> :
                                        <RxPlay  onClick={() => dispatch(setMusicState(!music.active))} className="text-white text-2xl hover:text-white/80 duration-200"/>
                                    }
                                    <RxTrackNext  onClick={() => dispatch(musicNext())} className="text-white text-xl hover:text-white/80 duration-200"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`flex justify-center items-center gap-1 rounded-lg bg-white/10 backdrop-blur-md w-full px-4 py-2`}>
                    <FaHeadphones className="text-white text-2xl mr-2"/>

                    <Slider
                        value={volume.value}
                        onChange={(v) => dispatch(setVolume(v as number))}
                    />
                </div>
            </div>  
        </>
    )
}

function Slider ({value, onChange, min = 0, max = 100, step = 0.1,}:{
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}) {
    const [isDragging, setIsDragging] = useState(false);
    const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
    return (
        <div className="w-full flex flex-col gap-1.5 select-none">
            <div className="relative flex items-center h-6 group cursor-pointer">
                <div className="absolute w-full h-4 bg-[#5c2232]/40 rounded-md overflow-hidden backdrop-blur-md">
                    <div 
                        className={`absolute h-full bg-[#cc6c60] rounded-r-md ${
                            isDragging ? '' : 'transition-all duration-150 ease-out'
                        }`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onPointerDown={() => setIsDragging(true)}
                    onPointerUp={() => setIsDragging(false)}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10 m-0"
                />
            </div>
        </div>
    );
};