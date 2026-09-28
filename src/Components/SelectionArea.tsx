import useWindowDimensions from '../ts/useWindowDimensions'
import { useSelector } from 'react-redux';
import { type RootState } from '../state/store';

const SelectionArea = () => {
    const {width, height} = useWindowDimensions()
    const sa = useSelector((state: RootState) => state.selectionArea)
    
    return (
        <div 
            style={{   
                left: `${sa.x0 < sa.x1 ? sa.x0 : sa.x1}px`,
                top: `${sa.y0 < sa.y1 ? sa.y0 : sa.y1}px`,
                right: `${width - (sa.x0 < sa.x1 ? sa.x1 : sa.x0)}px`,
                bottom: `${height - (sa.y0 < sa.y1 ? sa.y1 : sa.y0)}px`
            }}
            className={`fixed bg-select-area-bg border-2 border-select-area-border rounded-md z-20 pointer-events-none ${sa.isActive ? "block" : "hidden"}`}
        />
    )
}

export default SelectionArea