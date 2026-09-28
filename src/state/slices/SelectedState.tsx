import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SelectedStateSlice{
    selected: Record<string, {x: number, y: number}>
    offsetX: number,
    offsetY: number,
    isMoving: boolean,
}

const initialState: SelectedStateSlice = {
    selected: {},
    offsetX: 0,
    offsetY: 0,
    isMoving: false,
}

const SelectedStateSlice = createSlice({
    name: "selectedState",
    initialState,
    reducers: {
        clearAndAdd: (state, action:PayloadAction<string>) => {
            state.selected = {}
            state.selected[action.payload] = {x: 0, y: 0}
        },

        add: (state, action:PayloadAction<string>) => {
            state.selected[action.payload] = {x: 0, y: 0}
        },

        toggle: (state, action:PayloadAction<string>) => {
            if (action.payload in state.selected)
                delete state.selected[action.payload]
            else 
                state.selected[action.payload] = {x: 0, y: 0}
        },

        remove: (state, action:PayloadAction<string>) => {
            delete state.selected[action.payload]
        },

        clear: (state) => {
            state.selected = {}
        },

        moving: (state, action:PayloadAction<boolean>) => {
            state.isMoving = action.payload
        },

        offset: {
            reducer (state, action:PayloadAction<{x: number, y: number}>) {
                state.offsetX = action.payload.x
                state.offsetY = action.payload.y
            },
            prepare (x: number, y: number){
                return {
                    payload: {x, y}
                }
            }
        },

        positions: (state, action:PayloadAction<Record<string, {x: number, y: number}>>) => {
            for (const id in action.payload){
                if (id in state.selected){
                    state.selected[id].x = action.payload[id].x
                    state.selected[id].y = action.payload[id].y
                }
            }
        }
    }
}) 

export const SelectedStateActions = SelectedStateSlice.actions
export default SelectedStateSlice.reducer