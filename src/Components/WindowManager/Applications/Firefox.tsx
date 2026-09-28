import { LuMinus, /*LuMinimize,*/ LuMaximize, LuX, LuFolderDown   } from "react-icons/lu";
import { HiArrowLeft, HiArrowRight  } from "react-icons/hi";
import { IoReloadOutline, IoExtensionPuzzleOutline  } from "react-icons/io5";
import { PiSidebarSimpleFill, PiUserCircleFill, PiPlusBold, PiMinusBold  } from "react-icons/pi";
import { FaRegStar, FaPrint  } from "react-icons/fa";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { RiImageEditFill, RiImage2Fill } from "react-icons/ri";
import { BiHighlight } from "react-icons/bi";
import { RxText, RxDoubleArrowRight  } from "react-icons/rx";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { WindowManagerActions, type Window } from "../../../state/slices/WindowManagerSlice"

export default function Firefox({window}:{
    window: Window
}) {
    const [scale, setScale] = useState(100)
    const dispatch = useDispatch()
    return (
        <div className="w-full h-full flex flex-col bg-firefox-dark overflow-hidden">
            <div className="w-full h-11 shrink-0 flex items-center justify-between bg-firefox-dark">
                <div className="h-full px-3 py-1 z-40">
                    <div className="h-full w-64 flex items-center justify-between px-1 rounded-lg bg-firefox-highlight">
                        <div className="h-full flex items-center justify-center gap-1 min-w-0">
                            <img src="/icons/files/pdf.svg" className="w-6 h-6 shrink-0" />
                            <p className="text-white text-xs font-light truncate">{window.data.src}</p>
                        </div>
                        <button className="text-white text-sm hover:bg-white/10 w-6 h-6 rounded-md flex items-center justify-center"><LuX/></button>
                    </div>
                </div>
                <div className="h-full flex items-center justify-center z-40 text-white">
                    <button className="w-12 h-full flex items-center justify-center text-lg hover:bg-firefox-highlight"><LuMinus/></button>
                    <button className="w-12 h-full flex items-center justify-center text-lg hover:bg-firefox-highlight"><LuMaximize/></button>
                    <button onClick={() => dispatch(WindowManagerActions.remove([window.uuid]))} className="w-12 h-full flex items-center justify-center text-lg hover:bg-Red"><LuX/></button>
                </div>
            </div>


            <div className="w-full flex-1 flex flex-col min-h-0 rounded-md bg-firefox">
                <div className="w-full h-9 shrink-0 flex justify-between items-center px-2">
                    <div className="flex items-center justify-center gap-1">
                        <button className="text-white text-lg hover:bg-white/20 w-8 h-8 rounded-md flex items-center justify-center"><PiSidebarSimpleFill/></button>
                        <button className="text-white text-base hover:bg-white/20 w-8 h-8 rounded-md flex items-center justify-center"><HiArrowLeft/></button>
                        <button className="text-white text-base hover:bg-white/20 w-8 h-8 rounded-md flex items-center justify-center"><HiArrowRight/></button>
                        <button className="text-white text-base hover:bg-white/20 w-8 h-8 rounded-md flex items-center justify-center"><IoReloadOutline /></button>
                    </div>

                    <div className="h-7 w-3/5 bg-firefox-dark rounded-md flex items-center justify-between px-2">
                        <div>
                            <button className="text-white text-lg hover:bg-white/20 w-6 h-6 rounded-md flex items-center justify-center"><HiOutlineShieldCheck/></button>

                        </div>

                        <button className="text-white text-base hover:bg-white/20 w-6 h-6 rounded-md flex items-center justify-center"><FaRegStar/></button>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                        <button className="text-white text-xl hover:bg-white/20 w-8 h-8 rounded-md flex items-center justify-center"><PiUserCircleFill /></button>
                        <button className="text-white text-lg hover:bg-white/20 w-8 h-8 rounded-md flex items-center justify-center"><IoExtensionPuzzleOutline /></button>
                        <button className="text-white text-lg hover:bg-white/20 w-8 h-8 rounded-md flex items-center justify-center"><FiMenu /></button>
                    </div>
                </div>
                
                <div className="w-full h-8 shrink-0 bg-zinc-700 flex justify-between items-center">
                    <div className="w-1/3 flex items-center justify-start px-2">
                        <div className="flex items-center justify-center gap-1">
                            <button className="text-white/80 text-lg hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><IoIosArrowUp /></button>
                            <button className="text-white/80 text-lg hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><IoIosArrowDown/></button>
                            <input className="max-w-12 h-6 px-1 border-white/60 focus:border-blue-400 focus:outline-none border flex items-center justify-end text-white text-xs text-end" value={1}/>
                            <p className="text-white text-xs">of 1</p>
                        </div>
                    </div>

                    <div className="w-1/3 flex items-center justify-center px-2">
                        <div className="flex items-center justify-center gap-1">
                            <button onClick={() => setScale(prev => Math.max(prev - 10, 10))} className="text-white/80 text-sm hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><PiMinusBold /></button>
                            <button onClick={() => setScale(prev => Math.min(prev + 10, 500))} className="text-white/80 text-sm hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><PiPlusBold /></button>
                            <div className="text-white w-32 h-7 text-xs bg-white/5 flex items-center justify-between px-2"><p className="text-left">{scale}%</p> <IoIosArrowDown/></div>
                        </div>
                    </div>

                    <div className="w-1/3 flex items-center justify-end px-2">
                        <div className="flex items-center justify-center gap-1">
                            <button className="text-white text-lg hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><TbMessage /></button>
                            <button className="text-white text-lg hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><RiImageEditFill /></button>
                            <button className="text-white text-lg hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><BiHighlight /></button>
                            <button className="text-white text-xl hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><RxText /></button>
                            <button className="text-white text-lg hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><RiImage2Fill /></button>
                            <button className="text-white text-lg hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><FaPrint /></button>
                            <button className="text-white text-lg hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><LuFolderDown /></button>
                            <button className="text-white text-lg hover:bg-white/10 w-7 h-7 rounded-md flex items-center justify-center"><RxDoubleArrowRight  /></button>
                        </div>
                    </div>
                </div>

                <div className="w-full flex-1 p-3 overflow-auto">
                    <img
                        style={{ width: `${scale}%` }}
                        className="mx-auto h-auto object-contain block max-w-none transition-all duration-75 mb-2"
                        src="/images/Tengo Lomidze CV.pdf.webp"
                    />
                </div>
            </div>
        </div>
    )
}
