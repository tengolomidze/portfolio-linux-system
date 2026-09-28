// import { type RootState } from "../../../../state/store";
// import { useSelector } from "react-redux";
import { SettingsButtonsState } from "../../../../ts/states";

import { PiHeadsetLight } from "react-icons/pi";
import { CiPower, CiBluetooth  } from "react-icons/ci";
import { BsWifi  } from "react-icons/bs";
import PerformanceMonitor from "../PerformanceMonitor";

const SettingsBar = ({settingsState, setSettingsState}:{
        settingsState: SettingsButtonsState, 
        setSettingsState: React.Dispatch<React.SetStateAction<SettingsButtonsState>>
    }) => {
    // const system = useSelector((state: RootState) => state.system)
    
    return (
        <div 
            className="settings-bar flex items-center justify-center h-full rounded-full p-1 bg-dark/70 backdrop-blur-xs"
        >
            <div className="border-main/50 border w-3 h-3 rounded-full ml-3.5 mx-2"/>

            <div className="h-full flex items-center justify-center gap-1 px-3 rounded-full hover:bg-white/5 duration-200">
                <PerformanceMonitor />
            </div>

            <div className="h-1/2  border-l border-dotted border-main/50 mx-2"/>

            <div 
                onClick={() => 
                    settingsState === SettingsButtonsState.Closed ?
                    setSettingsState(SettingsButtonsState.Settings) :
                    setSettingsState(SettingsButtonsState.Closed)
                }  
                className="h-full flex items-center justify-center gap-1 px-5 rounded-full hover:bg-white/5 duration-200"
            >
                <BsWifi className="text-xl text-main"/>
                <CiBluetooth className="text-lg text-main"/>
                <PiHeadsetLight className="text-lg text-main"/>
            </div>
            
            <div className="h-1/2  border-l border-dotted border-main/50 mx-2"/>

            <div className="pr-2.5 pl-3 h-full flex items-center justify-center rounded-full hover:bg-white/5 duration-200">
                <CiPower className="text-xl text-main"/>
            </div>
        </div>
    )
}

export default SettingsBar