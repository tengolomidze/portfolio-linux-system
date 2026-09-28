import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MouseSlice{
    x: number,
    y: number,
    xDown: number,
    yDown: number,
    isDown: boolean,
    isDragging: boolean,
    timeOfLastClick: number,
    startTarget: string,
    endTarget: string,
}

const initialState: MouseSlice = {
    x: 0,
    y: 0,
    xDown: 0,
    yDown: 0,
    isDown: false,
    isDragging: false,
    timeOfLastClick: 0,
    startTarget: "",
    endTarget: "",
}

const MouseSlice = createSlice({
    name: "mouse",
    initialState,
    reducers: {
        position : {
            reducer (state, action:PayloadAction<{x: number, y:number}>) {
                state.x = action.payload.x
                state.y = action.payload.y
            },
            prepare (x: number, y:number){
                return {
                    payload: {x, y}
                }
            }
        },

        down: {
            reducer (state, action: PayloadAction<{ v: boolean; x: number; y: number }>) {
                state.isDown = action.payload.v
                state.xDown = action.payload.x
                state.yDown = action.payload.y
                if (action.payload.v === false)
                    state.timeOfLastClick = Date.now()
            },
            prepare (v: boolean, x?: number, y?: number) {
                return {
                    payload: { v, x: x??0, y: y??0 }
                };
            },
        },

        dragging(state, action:PayloadAction<boolean>){
            state.isDragging = action.payload
        },
        startTarget(state, action:PayloadAction<string>){
            state.startTarget = action.payload
        },
        endTarget(state, action:PayloadAction<string>){
            state.endTarget = action.payload
        },
    }
})

export const MouseActions = MouseSlice.actions;
export default MouseSlice.reducer;