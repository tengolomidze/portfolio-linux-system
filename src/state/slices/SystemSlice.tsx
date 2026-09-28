import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../ts/states"

interface SystemSlice{
    appState: AppState, 

    brightness: number,
    airplaneMode: boolean,
    nightLight: boolean,
    volume: {
        value: number,
        isMuted: boolean,
    },
    bluetooth: {
        current: string,
        active: boolean,
        list: {name:string, strenght:number}[]
    },
    wifi: {
        current: string,
        active: boolean,
        list: {name:string, strenght:number, locked: boolean}[]
    },
    music: {
        current: number,
        active: boolean,
        list: {name:string, author:string}[]
    }
}

const initialState: SystemSlice = {
    appState: AppState.Desktop,
    brightness: 1,
    airplaneMode: false,
    nightLight: false,
    volume: {
        value: 80,
        isMuted: false
    },
    bluetooth: {
        current: "",
        active: false,
        list: []
    },
    wifi: {
        current: "CrigNet",
        active: true,
        list: [{name: "CrigNet", strenght: 0.8, locked:false}, {name: "Mr. Robot", strenght: 0.2, locked:true}, {name: "Tbilisi Loves You", strenght: 0.2, locked:true}]
    },
    music: {
        current: 0,
        active: false,
        list: [{name:"HEX (Slowed)", author: "BAKUSLAYER"}, {name: "Bite Marks", author: "TEYA"}]
    },
}

const SystemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        setAppState(state, action: PayloadAction<AppState>){
            state.appState = action.payload
        },
        setMusicState(state, action: PayloadAction<boolean>){
            state.music.active = action.payload
        },
        setVolume(state, action: PayloadAction<number>){
            state.volume.value = action.payload
        },
        musicNext(state){
            if(state.music.current === state.music.list.length - 1) state.music.current = 0
            else state.music.current += 1
        },
        musicPrevious(state){
            if(state.music.current === 0) state.music.current = state.music.list.length - 1
            else state.music.current -= 1
        },
        setAirplaneMode(state, action: PayloadAction<boolean>){
            state.airplaneMode = action.payload
        },
        setNightLight(state, action: PayloadAction<boolean>){
            state.nightLight = action.payload
        },
        setBrightness(state, action: PayloadAction<number>){
            state.brightness = action.payload
        },
    }
})

export const {setAppState, setMusicState, setVolume, musicNext, musicPrevious, setAirplaneMode, setNightLight, setBrightness} = SystemSlice.actions;
export default SystemSlice.reducer;