import { useSelector } from "react-redux"
import { type RootState } from "../state/store"

const ScreenFilters = () => {
    const system = useSelector((state: RootState) => state.system)

    return (
        <>
            <div 
                style={
                    {
                        zIndex: "999999", 
                        backdropFilter: `brightness(${system.brightness * 0.6  + 0.4})`
                    }
                } 
                className={`fixed top-0 bottom-0 left-0 right-0 pointer-events-none duration-200`}>
                </div>

            <div 
                style={{zIndex: "999999"}} 
                className={`fixed top-0 bottom-0 left-0 right-0 pointer-events-none ${system.nightLight ? "backdrop-sepia-[50%]" : ""} duration-200`}>
            </div>
        </>
    )
}

export default ScreenFilters