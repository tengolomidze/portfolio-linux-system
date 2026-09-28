import { configureStore } from '@reduxjs/toolkit'
import FileSystemSlice from "./slices/FileSystemSlice.tsx"
import SystemSlice from "./slices/SystemSlice.tsx"
import SelectionAreaSlice from './slices/SelectionAreaSlice.tsx'
import MouseSlice from "./slices/MouseSlice.tsx"
import DesktopStateSlice from './slices/DesktopStateSlice.tsx'
import SelectedStateSlice from './slices/SelectedState.tsx'
import PreloaderStateSlice from './slices/PreloaderState.tsx'
import WindowManagerSlice from './slices/WindowManagerSlice.tsx'

export const store = configureStore({
    reducer: {
        system: SystemSlice,
        fileSystem: FileSystemSlice,
        mouse: MouseSlice,
        desktopState: DesktopStateSlice,
        selectionArea: SelectionAreaSlice,
        selectedState: SelectedStateSlice,
        preloader: PreloaderStateSlice,
        windowManager: WindowManagerSlice
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']