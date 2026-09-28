import { MdBattery60 } from "react-icons/md";
import { TbScreenshot } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { BiSolidLockAlt } from "react-icons/bi";
import { FaVolumeXmark } from "react-icons/fa6";
import { FaHeadphones } from "react-icons/fa6";
import { BsBrightnessHighFill } from "react-icons/bs";
import { MdSignalWifi3Bar } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { PiBluetoothFill } from "react-icons/pi";
import { BiSolidTachometer } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../../../state/store";
import { setAirplaneMode, setBrightness, setVolume, setNightLight } from "../../../../state/slices/SystemSlice";
import { AppState, SettingsButtonsState } from "../../../../ts/states";
import "./settings.css"
import type React from "react";

const Settings = ({settingsState}:{
		settingsState: SettingsButtonsState, 
	}) => {
	const system = useSelector((state: RootState) => state.system)

	return (
		<div 
			className={`
				${settingsState === SettingsButtonsState.Closed ? 
				'settings-slide-up opacity-0 pointer-events-none' : 
				"settings-slide-down"} 

				${system.appState !== AppState.Desktop ? 
				'invisible' : ""}

				settings-bar flex fixed flex-col items-center justify-center gap-2 top-12 right-2 bg-settings-bg/80 backdrop-blur-sm w-96 h-85 rounded-xl z-90 p-4 `}
		>
			<div className="flex items-center justify-between w-full">
				<div className={`${settingsState !== SettingsButtonsState.Closed ? "settings-slide-down-with-bump" : null} h-9 px-3 bg-settings-button bg-opacity-70 rounded-xl flex items-center text-settings-text text-md`}><MdBattery60 className="text-settings-text text-lg"/> 0%</div>
				<div className="flex items-center justify-center gap-2">
					<SquareButton {...{settingsState}}><TbScreenshot/></SquareButton>
					<SquareButton {...{settingsState}}><IoMdSettings/></SquareButton>
					<SquareButton {...{settingsState}}><BiSolidLockAlt/></SquareButton>
					<SquareButton {...{settingsState}}><FaPowerOff/></SquareButton>
				</div>
			</div>

			<VolumeSlider volume={system.volume} setValue={setVolume} icon={<FaHeadphones/>} noSoundicon={<FaVolumeXmark/>} {...{settingsState}}/>
			<SettingsSlider value={system.brightness} setValue={setBrightness} icon={<BsBrightnessHighFill/>} {...{settingsState}}/>

			<div className="w-full h-full gap-3 grid grid-cols-2 grid-rows-3">
				<ButtonWithOptions name="WI-FI" subtext={system.wifi.current} icon={<MdSignalWifi3Bar/>} state={system.wifi.active} {...{settingsState}}/>
				<ButtonWithOptions name="Bluetooth" subtext={system.bluetooth.current} icon={<PiBluetoothFill/>} state={system.bluetooth.active} {...{settingsState}}/>
				<ButtonWithOptions name="Power" subtext="Balanced" icon={<BiSolidTachometer/>} state={false} {...{settingsState}}/>
				<ButtonWithoutOptions name="Night Light" icon={<FaMoon/>} state={system.nightLight} setState={setNightLight} {...{settingsState}}/>
				<ButtonWithoutOptions name="Airplane Mode" icon={<IoIosAirplane/>} state={system.airplaneMode} setState={setAirplaneMode} {...{settingsState}}/>
			</div>
		</div>
  	)
}

const SquareButton = ({children, settingsState}:{
	children:React.JSX.Element,
	settingsState: SettingsButtonsState,
}) => {
	return (
		<div className={`${settingsState !== SettingsButtonsState.Closed ? "settings-slide-down-with-bump" : null} h-9 w-9 shrink-0 flex items-center justify-center bg-settings-button 
			bg-opacity-70 rounded-xl hover:bg-opacity-60 duration-200  text-settings-text text-md`}>
			{children}
		</div>
	)
}

const SettingsSlider = ({value, setValue, icon, settingsState}:{
	value: number, 
	setValue: any, 
	icon:React.JSX.Element, 
	settingsState: SettingsButtonsState
}) => {
	// const dispatch = useDispatch()
	value;setValue;
	return (
		<div className="flex items-center justify-center w-full gap-2">
			<SquareButton {...{settingsState}}>{icon}</SquareButton>
			<div 
				className={`${settingsState !== SettingsButtonsState.Closed ? "settings-slide-down-with-bump" : null} 
				flex items-center justify-center w-full  `}
			>
				{/* <PrettoSlider
					aria-label="pretto slider"
					value={Math.floor(value*100)}
					onChange={(_e, v) => {dispatch(setValue(v as number/100))}}
				/> */}
			</div>
      	</div>
	)
}

const VolumeSlider = ({volume, setValue, icon, noSoundicon, settingsState}:{
	volume: any, 
	setValue: any, 
	icon:React.JSX.Element, 
	noSoundicon:React.JSX.Element, 
	settingsState: SettingsButtonsState,
}) => {
	// const dispatch = useDispatch()
	setValue;
	return (
		<div className="flex items-center justify-center w-full gap-2">
			<div  
				onClick={() => {/*TODO*/}}
				className={`${settingsState !== SettingsButtonsState.Closed ? "settings-slide-down-with-bump" : null} h-9 w-9 shrink-0 flex items-center justify-center bg-settings-button 
				bg-opacity-70 rounded-xl hover:bg-opacity-60 duration-200  text-settings-text text-md`}>
				{volume.value !== 0 && !volume.isMuted ? icon : noSoundicon}
			</div>
			<div 
				className={`${settingsState !== SettingsButtonsState.Closed ? "settings-slide-down-with-bump" : null} 
				flex items-center justify-center w-full  `}
			>
				{/* <PrettoSlider
					aria-label="pretto slider"
					value={Math.floor(volume.value*100)}
					onChange={(_e, v) => {dispatch(setValue(v as number/100))}}
				/> */}
			</div>
      	</div>
	)
}

const ButtonWithOptions = ({name, subtext, icon, state, settingsState}:{
	name: string,
	subtext: string,
	icon: React.JSX.Element,
	state: boolean,
	settingsState: SettingsButtonsState,
}) => {
	return (
		<div 
			className={`
				${state ? "bg-settings-active bg-opacity-90" : "bg-settings-button/70"} 
				${settingsState !== SettingsButtonsState.Closed ? "settings-slide-down-with-bump" : null} 
				w-full h-full rounded-lg flex items-center justify-center overflow-hidden duration-150`}
		>
			<div className="w-full h-full flex items-center justify-start gap-3 px-3 bg-black bg-opacity-0 hover:bg-opacity-10 duration-200 ">
				<div className="text-settings-text text-xl">{icon}</div>
				<div className="flex flex-col items-start justify-center">
					<p className="text-settings-text font-segoe text-sm leading-4">{name}</p>
					<p className="text-settings-text text-opacity-80 font-segoe-medium text-xs leading-3">{subtext}</p>
				</div>
			</div>
			<div className="h-full w-1 bg-settings-bg opacity-80"></div>
			<div className="w-10 h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 duration-200 ">
				<FaChevronRight className="text-settings-text text-md"/>
			</div>
		</div>
	)
}

const ButtonWithoutOptions = ({name, icon, state, setState, settingsState}:{
	name: string,
	icon: React.JSX.Element,
	state: boolean
	setState: any,
	settingsState: SettingsButtonsState,
}) => {
	const dispatch = useDispatch()
	return (
		<div 
			className={`
				${state ? "bg-settings-active bg-opacity-90" : "bg-settings-button bg-opacity-70"} 
				${settingsState !== SettingsButtonsState.Closed ? "settings-slide-down-with-bump" : null} 
				w-full h-full rounded-lg flex items-center justify-center overflow-hidden duration-150`}
		>
			<div onClick={() => dispatch(setState(!state))} className="w-full h-full flex items-center justify-start gap-3 pl-3 bg-black bg-opacity-0 hover:bg-opacity-10 duration-200">
				<div className="text-settings-text text-md">{icon}</div>
				<div className="flex flex-col items-start justify-center">
				<p className="text-settings-text font-segoe text-sm leading-4">{name}</p>
				</div>
			</div>
		</div>
	)
}

export default Settings 