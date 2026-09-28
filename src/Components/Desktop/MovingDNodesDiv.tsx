//import useWindowDimensions from '../TS/useWindowDimensions'
import { useSelector } from 'react-redux';
import { type RootState } from '../../state/store';
import { getIcon } from '../../ts/getNodeIcon';
import { getUuidFromId } from '../../state/slices/FileSystemSlice';

export default function MovingDNodesDiv () {
    const ss = useSelector((state: RootState) => state.selectedState)

    return (
        <>
            {ss.isMoving ? Object.keys(ss.selected).map((id:string) => 
                <DNodeDiv nodeId={id} key={id}/>
            ) : null}
        </>
    )
}

function DNodeDiv ({nodeId}:{
    nodeId: string,
}) {
    const dimensions = useSelector((state: RootState) => state.desktopState.dimensions)
    const ss = useSelector((state: RootState) => state.selectedState)
    const mouse = useSelector((state: RootState) => state.mouse)
    const node = useSelector((state: RootState) => state.fileSystem)[getUuidFromId(nodeId)?? ""]

    if(!node) return

    return (  
        <div 
            style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.width * dimensions.widthToHeight}px`,
                left: `${mouse.x + ss.selected[nodeId].x - ss.offsetX}px`,
                top: `${mouse.y + ss.selected[nodeId].y - ss.offsetY}px`,
            }}
            className='w-full h-full flex flex-col items-center p-1 pointer-events-none opacity-50 z-50 fixed'
        >
            <div className="bg-node-bg-hover w-full flex flex-col items-center p-1 duration-200 rounded-sm">
                <img 
                    src={getIcon(node)}
                    className='object-contain'
                    style={{width: `${dimensions.width*dimensions.widthToImageSize}px`, height: `${dimensions.width*dimensions.widthToImageSize}px`}}
                />
                <p className='text-sm text-white grow-0 w-full max-w-full text-ellipsis text-center wrap-break-word'>{node.name}</p>
            </div>
        </div> 
    )
}