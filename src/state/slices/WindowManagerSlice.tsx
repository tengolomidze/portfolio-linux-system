import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum WindowType {
    FileExplorer = "FileExplorer",
    Firefox = "Firefox",
}

export interface Window {
    name: string
    uuid: string
    type: WindowType
    data: any
    x0: number
    y0: number
    x1: number
    y1: number
    minimized: boolean
    maximized: boolean
}

export interface WindowManagerSlice{
    windows: Record<string, Window>
    order: string[]
    target: string
    direction: string
    isMoving: boolean
    offsets: {
        x0: number
        y0: number
        x1: number
        y1: number
    }
}

const initialState: WindowManagerSlice = {
    windows: {},
    order: [],
    target: "",
    direction: "",
    isMoving: false,
    offsets: {
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 0,
    }
}

const MIN_WIDTH = 500
const MIN_HEIGHT = 0.2 * MIN_WIDTH

const WindowManagerSlice = createSlice({
    name: "windowManager",
    initialState,
    reducers: {
        add (state, action:PayloadAction<Window[]>){
            for (let i = 0; i < action.payload.length; i++){
                if (action.payload[i].uuid in state.windows){
                    state.order = state.order.filter(uuid => uuid !== action.payload[i].uuid)
                    state.order.push(action.payload[i].uuid)
                    continue
                }
                state.windows[action.payload[i].uuid] = action.payload[i]
                state.order.push(action.payload[i].uuid)
            }
            state.order = [ ...state.order]
        },
        remove (state, action:PayloadAction<string[]>){
            for (let i = 0; i < action.payload.length; i++){
                delete state.windows[action.payload[i]]
                state.order = state.order.filter(uuid => uuid !== action.payload[i])
            }
        },
        moveToFront(state, action:PayloadAction<string>) {
            state.order = state.order.filter(uuid => uuid !== action.payload)
            state.order = [...state.order, action.payload]
        },
        startMoving: {
            reducer (state, action:PayloadAction<{uuid: string, direction: string, x: number, y: number}>) {
                const { uuid, direction, x, y } = action.payload
                state.isMoving = true
                state.direction = direction
                state.target = uuid
                
                state.offsets = {
                    x0: state.windows[uuid].x0 - x,
                    y0: state.windows[uuid].y0 - y,
                    x1: state.windows[uuid].x1 - x,
                    y1: state.windows[uuid].y1 - y,
                }
            },
            prepare (uuid: string, direction: string, x: number, y: number){
                return {
                    payload: {uuid, direction, x, y}
                }
            }
        },
        move: {
            reducer (state, action:PayloadAction<{x: number, y: number}>) {
                const { x, y } = action.payload
                if (state.direction.includes("T")) 
                    if (state.windows[state.target].y1 - y > MIN_HEIGHT)
                        state.windows[state.target].y0 = y + state.offsets.y0
                if (state.direction.includes("R"))  
                    if (x - state.windows[state.target].x0 > MIN_WIDTH)
                        state.windows[state.target].x1 = x + state.offsets.x1
                if (state.direction.includes("B"))  
                    if (y - state.windows[state.target].y0 > MIN_HEIGHT)
                        state.windows[state.target].y1 = y + state.offsets.y1
                if (state.direction.includes("L"))  
                    if (state.windows[state.target].x1 - x > MIN_WIDTH)
                        state.windows[state.target].x0 = x + state.offsets.x0
                if (state.direction.includes("M")) {
                    state.windows[state.target].x0 = x + state.offsets.x0
                    state.windows[state.target].y0 = y + state.offsets.y0
                    state.windows[state.target].x1 = x + state.offsets.x1
                    state.windows[state.target].y1 = y + state.offsets.y1
                }


                
            },
            prepare (x: number, y: number){
                return {
                    payload: {x, y}
                }
            }
        },
        stopMoving (state){
                state.isMoving = false
                state.direction = ""
                state.target = ""
                state.offsets = {
                    x0: 0,
                    y0: 0,
                    x1: 0,
                    y1: 0,
                }
        },
    }
})

export const WindowManagerActions = WindowManagerSlice.actions
export default WindowManagerSlice.reducer;