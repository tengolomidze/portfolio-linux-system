import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppState } from '../../state/slices/SystemSlice'
import { AppState } from "../../ts/states";
import { MdOutlineNavigateNext } from "react-icons/md";
import type { RootState } from "../../state/store";
import { PRELOAD } from "../PreLoader";

export default function SignIn ({setIsHidden}:{
        setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
    }) {
    const preloader = useSelector((state: RootState) => state.preloader)

    return (
        <>
            <div className='flex flex-col items-center justify-center gap-2 fixed top-0 left-0 bottom-0 right-0 z-30 animate-content-scale'>
                <img src={preloader.assets[PRELOAD.PROFILE_PICTURE].url} className="w-48 h-48 rounded-full"/>
                <p className="text-3xl text-white/95 font-light font-jakarta tracking-wide">Tengo Lomidze</p>
                <div className="h-5"/>
                <PasswordInput setIsHidden={setIsHidden}/>
            </div>
            <p className="absolute z-40 bottom-4 right-6 text-white/30 text-sm font-light font-jakarta tracking-wide">password: crig123</p>
        </>
    )
}

function PasswordInput ({setIsHidden}:{
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const dispatch = useDispatch()

    const [password, setPassword] = useState<string>("");
    const [hasError, setHasError] = useState(false);

    const triggerError = () => setHasError(true)
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === "crig123"){
            dispatch(setAppState(AppState.Desktop))
            setTimeout(() => setIsHidden(true), 1000)
        }
        else
            triggerError()
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            onAnimationEnd={() => setHasError(false)}
            className={`relative min-w-xs ${hasError ? "animate-error-shake" : ""}`}
        >
            <div className="relative">
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    autoFocus
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className={`w-full font-jakarta rounded-full bg-white/10 py-2.5 pl-4 pr-11 text-center text-white/0 placeholder-white/50 border backdrop-blur-md outline-none transition-all duration-200 ${
                    hasError
                        ? "border-red-500/80 ring-2 ring-red-500/30"
                        : "border-white/20"
                    }`}
                />
                <div className="flex items-center justify-center gap-0.5 absolute top-0 bottom-0 left-4 right-4 pointer-events-none">
                        {password.split("").map((_v, i) =>
                            <div key={i} className="w-3 h-3 rounded-full bg-white/75 slide-up"></div>
                        )}
                </div>
            </div>

            <button
                className={`${password === "" ? "opacity-0" : "opacity-100"} absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/15 active:scale-95`}
            >
                <MdOutlineNavigateNext className="text-2xl text-white/80"/> 
            </button>
        </form>
    );
};