
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../state/store"
import { WindowManagerActions, type Window } from "../../state/slices/WindowManagerSlice"
import { getApplicationDiv } from "../../ts/getApplication"
import { useEffect, useRef } from "react"

export default function WindowManager () {
    const wm = useSelector((state: RootState) => state.windowManager)
    return (
        <>
            {wm.order.map((uuid, i) => 
                <WindowBorder window={wm.windows[uuid]} index={i} key={uuid}>
                    {getApplicationDiv(wm.windows[uuid])}
                </WindowBorder>
            )}
        </>
    )
}

function WindowBorder ({window, index, children}: {window: Window, index: number, children?: React.ReactNode}) {
    const dispatch = useDispatch()
    return (
        <div
            onPointerDown={() => dispatch(WindowManagerActions.moveToFront(window.uuid))}
            style={{
                zIndex: 30 + index,
                top: `${window.y0}px`,
                left: `${window.x0}px`,
                width: `${window.x1 - window.x0}px`,
                height: `${window.y1 - window.y0}px`,
            }}
            className="flex flex-col items-center justify-center fixed"
        >
            <div className="flex items-center justify-center w-full">
                <div id={`WINDOW-TL_${window.uuid}`} className="w-2 h-2 sizenwse"/>
                <div id={`WINDOW-T_${window.uuid}`} className="w-full h-2 sizens"/>
                <div id={`WINDOW-TR_${window.uuid}`} className="w-2 h-2 sizenesw"/>
            </div>

            <div className="flex items-center justify-center h-full w-full">
                <div id={`WINDOW-L_${window.uuid}`} className="w-2 h-full sizewe"/>
                <div className="w-full h-full relative">
                    <div id={`WINDOW-M_${window.uuid}`} className="absolute top-0 left-0 right-0 h-11 z-30" />
                    <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-md shadow-xl">
                        {children}
                    </div>
                </div>
                <div id={`WINDOW-R_${window.uuid}`} className="w-2 h-full sizewe"/>
            </div>

            <div className="flex items-center justify-center w-full">
                <div id={`WINDOW-BL_${window.uuid}`} className="w-2 h-2 sizenesw"/>
                <div id={`WINDOW-B_${window.uuid}`} className="w-full h-2 sizens"/>
                <div id={`WINDOW-BR_${window.uuid}`} className="w-2 h-2 sizenwse"/>
            </div>
        </div>
    )
}