import { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from '../../state/store'
import { AppState, LockedScreenButtonsState } from "../../ts/states";

import "./LockedScreen.css"
import Locked from "./Locked";
import Buttons from "./Buttons";
import SignIn from "./SignIn";
import { PRELOAD } from "../PreLoader";


export default function HomePage () {
	const appState = useSelector((state: RootState) => state.system.appState)

	const [isSignIn, setIsSignIn] = useState(false)
	const [isHidden, setIsHidden] = useState(appState === AppState.Desktop)
	const [buttonsState, setButtonsState] = useState(LockedScreenButtonsState.Closed)

	const preloader = useSelector((state: RootState) => state.preloader)

	if (appState === AppState.Kernel || isHidden === true) return null;
	return (
		<div className=	{`${appState !== AppState.LockedScreen ? "animate-screen-fade-out opacity-0" : ""} bg-black flex items-center justify-center fixed top-0 left-0 bottom-0 right-0 z-40`}>
			{!isSignIn ? 
				<>
					<Locked isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>
					<Buttons buttonsState={buttonsState} setButtonsState={setButtonsState}/>
				</>
			:
				<SignIn setIsHidden={setIsHidden}/>
			}

			{/* <img
				className={`${isSignIn ? "blur-lg scale-125 animate-screen-zoom-in" : "blur-xs scale-110"} absolute w-full h-full inset-0 object-cover brightness-90 animate-screen-fade-in`}
				src={`/images/locked_screena.jpg`}
			/> */}
			<video
				className={`${isSignIn ? "blur-lg scale-125 animate-screen-zoom-in" : "blur-xs scale-105 animate-screen-fade-in"} absolute w-full h-full inset-0 object-cover brightness-90`}
				src={preloader.assets[PRELOAD.LOCKED_SCREEN_BG].url}
				autoPlay
				loop
				muted
				playsInline
			/>
		</div>
	)
}