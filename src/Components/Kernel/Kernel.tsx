import { useState, useMemo, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setAppState } from '../../state/slices/SystemSlice'
import { type RootState } from '../../state/store'
import { AppState } from "../../ts/states"
import strings from "./kernel.txt?raw"
import useWindowDimensions from "../../ts/useWindowDimensions"

const DELAY = 4
const FREEZE_EVERY_NTH = 16
const FREEZE_CHANCE = 0.9
const END_DELAY = 1500
const MAX_LINES_VISIBLE = 75
const KERNEL_LINES = strings.split("\n")

export default function Kernel () {
    const appState = useSelector((state: RootState) => state.system.appState)
    const dispatch = useDispatch()
    const [kernel, setKernel] = useState<string[]>([])
    const [errors, setErrors] = useState<string[]>([])
    const { width } = useWindowDimensions()

    useEffect(() => {
        if (appState !== AppState.Kernel) return

        let timeoutId: number
        function printLine (i: number) {
            if (i >= KERNEL_LINES.length) {
                if (width >= 1280) {
                    timeoutId = setTimeout(() => dispatch(setAppState(AppState.LockedScreen)), END_DELAY)
                } else {
                    setTimeout(() =>
                        setErrors((prev) => {
                            const error = [
                                "[ Error ] ",
                                "[ Error ] This application is optimized for desktop screens.",
                                "[ Error ] Please switch to a desktop or laptop computer to continue.",
                            ]
                            return [...prev, ...error]
                        })
                    , END_DELAY)
                }

                return
            }

            setKernel((prev) => {
                const next = [...prev, KERNEL_LINES[i]]
                return next.length > MAX_LINES_VISIBLE 
                    ? next.slice(next.length - MAX_LINES_VISIBLE) 
                    : next
            })

            let delay = DELAY
            if (i > 0 && i % FREEZE_EVERY_NTH === 0) 
                if (Math.random() < FREEZE_CHANCE) 
                    delay = DELAY + Math.floor(Math.random() * 300)
            timeoutId = setTimeout(() => printLine(i + 1), delay)
        }

        printLine(0)
        return () => clearTimeout(timeoutId)
    }, [appState])

    if (appState !== AppState.Kernel) return null
    return (
        <div className="flex flex-col items-start justify-start fixed bottom-0 left-0 w-screen min-h-screen p-2 bg-black overflow-hidden">
            {kernel.map((text, i) => 
                <pre key={`${i}-${text}`} className="text-zinc-400 m-0 text-[8px] lg:text-sm leading-snug">
                    <Highlight query="OK" className="text-emerald-400">{text}</Highlight>
                </pre>
            )}

            {errors.map((text, i) => 
                <pre key={`${i}-${text}`} className="text-zinc-400 m-0 text-[8px] lg:text-sm leading-snug">
                    <Highlight query="Error" className="text-red-400">{text}</Highlight>
                </pre>
            )}
        </div> 
    )
}

function Highlight ({ children, query, className }: {
    children: string,
    query: string,
    className: string
}) {
    const parts = useMemo(() => {
        const trimmed = query.trim()
        if (!trimmed) return [children]

        const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`(${escaped})`, 'gi')

        return children.split(regex)
    }, [children, query])

    const trimmedQuery = query.trim().toLowerCase()

    if (!trimmedQuery) return <span>{children}</span>
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === trimmedQuery ?
                <strong key={i} className={className}>{part}</strong>
                : part
            )}
        </span>
    )
}