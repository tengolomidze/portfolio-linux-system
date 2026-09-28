import Kernel from './Components/Kernel/Kernel'
import LockedScreen from './Components/LockedScreen/LockedScreen'
import Desktop from './Components/Desktop/Desktop'

import Music from './Components/Music'
import ScreenFilters from './Components/ScreenFilters'
import PointerEvents from './Components/PointerEvents'
import SelectionArea from './Components/SelectionArea'
import MovingDNodesDiv from './Components/Desktop/MovingDNodesDiv'
import PreLoader from './Components/PreLoader'
import WindowManager from './Components/WindowManager/WindowManager'



function App() {
    return (
        <>
            <PreLoader />
            <PointerEvents />
            <Music />

            <Kernel />
            <LockedScreen />
            <Desktop />

            <WindowManager />
            <SelectionArea />
            <ScreenFilters />
            <MovingDNodesDiv /> 
        </>
    )
}

export default App
