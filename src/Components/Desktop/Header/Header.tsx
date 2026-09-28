import { useEffect, useState } from "react";

// import { useSelector } from 'react-redux'
// import { type RootState } from "../../../state/store";
import { SettingsButtonsState } from "../../../ts/states";
import { useCurrentDate } from "../../../ts/useCurrentDate";

import Settings from "./Settings/Settings";
import SettingsBar from "./Settings/SettingsBar";

import { SiHyprland } from "react-icons/si";
import { TfiBell } from "react-icons/tfi";
import { GoClock } from "react-icons/go";
import { BsGrid3X3GapFill } from "react-icons/bs";

const Header = () => {
    // const appState = useSelector((state: RootState) => state.system.appState)
    const [settingsState, setSettingsState] = useState(SettingsButtonsState.Closed)
    const now = useCurrentDate()

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const hasClass = target.closest(".settings-bar") !== null;

            if (!hasClass) 
                setSettingsState(SettingsButtonsState.Closed);
        };

        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div id="HEADER" className='flex items-center justify-between fixed inset-0 w-full h-11 z-30 px-4 py-1'>
                <div id="HEADER" className="w-1/3 h-full flex items-center justify-start">
                    <div className="flex items-center justify-center gap-5 h-full rounded-full px-4 p-1 bg-dark/70 backdrop-blur-xs">                        
                        <BsGrid3X3GapFill className="text-base text-main/90"/>
                        
                        <div className="h-1/2  border-l border-dotted border-main/50 mx-1"/>
                        <div className="flex items-center justify-center gap-1.5">
                            <GoClock className="text-sm text-main/90"/>
                            <p className="text-white font-jakarta font-thin tracking-widest text-sm text-center">
                                {now.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true })}
                            </p>
                        </div>
                    </div>
                </div>

                <div id="HEADER" className="w-1/3 h-full flex items-center justify-center">
                    <div className="flex items-center justify-center gap-5 h-full rounded-full px-4 p-1 bg-dark/70 backdrop-blur-xs">
                        <SiHyprland className="text-base text-main/90"/>
                        <div className="h-1/2 border-l border-dotted border-main/50 mx-1"/>
                        <div className="text-sm text-main">一</div>
                        <div className="text-sm text-main/60">二</div>
                        <div className="text-sm text-main/60">三</div>
                        <div className="text-sm text-main/60">四</div>
                        <div className="text-sm text-main/60">五</div>
                        <div className="h-1/2  border-l border-dotted border-main/50 mx-1"/>
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-base text-main/90 font-sans font-thin">1</p>
                            <TfiBell className="text-base text-main/90"/>
                        </div>
                    </div>
                </div>

                <div id="HEADER" className="w-1/3 h-full flex items-center justify-end">
                    <SettingsBar settingsState={settingsState} setSettingsState={setSettingsState}/>
                </div>
            </div>

            <Settings settingsState={settingsState}/>
        </>
    )
}

export default Header