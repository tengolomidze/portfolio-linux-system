import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SelectionAreaSlice{
    x0: number
    y0: number
    x1: number
    y1: number
    isActive: boolean
}

const initialState: SelectionAreaSlice = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    isActive: false,
}

const SelectionAreaSlice = createSlice({
    name: "selectionArea",
    initialState,
    reducers: {
        start: {
            reducer (state, action:PayloadAction<{x: number, y:number}>) {
                state.x0 = action.payload.x
                state.y0 = action.payload.y
            },
            prepare (x: number, y: number) {
                return {
                    payload: { x, y }
                }
            }
        },
        position: {
            reducer (state, action:PayloadAction<{x: number, y:number}>) {
                state.x1 = action.payload.x
                state.y1 = action.payload.y
            },
            prepare (x: number, y: number) {
                return {
                    payload: { x, y }
                }
            }
        },
        active: (state, action:PayloadAction<boolean>) => {
            state.isActive = action.payload
        }
    }
})

export const SelectionAreaActions = SelectionAreaSlice.actions
export default SelectionAreaSlice.reducer;