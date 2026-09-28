import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PreloaderStateSlice{
    assets: Record<string, {
        url: string,
        isReady: boolean
    }>
}

const initialState: PreloaderStateSlice = {
    assets: {}
}

const PreloaderStateSlice = createSlice({
    name: "preloader",
    initialState,
    reducers: {
        set: {
            reducer (state, action: PayloadAction<{src: string, url: string}>) {
                state.assets[action.payload.src].url = action.payload.url
                state.assets[action.payload.src].isReady = true
            },
            prepare (src: string, url: string) {
                return {
                    payload: {src, url}
                }
            }
        },
        add: (state, action: PayloadAction<string>) => {
            state.assets[action.payload] = {
                url: "",
                isReady: false
            }
        }
    }
}) 

export const PreloaderActions = PreloaderStateSlice.actions
export default PreloaderStateSlice.reducer