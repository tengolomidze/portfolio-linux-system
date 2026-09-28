import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../state/store'
import { type SelectionAreaSlice } from '../../state/slices/SelectionAreaSlice'
import { useEffect, useRef } from 'react'
import { getIcon } from '../../ts/getNodeIcon'
import { DesktopActions } from '../../state/slices/DesktopStateSlice'
import { type FSNode } from '../../state/slices/FileSystemSlice'


export default function DesktopSpace () {
    const dispatch = useDispatch();

    const nodes = useSelector((state: RootState) => state.fileSystem)
    const dimensions = useSelector((state: RootState) => state.desktopState.dimensions)
   
    const desktopRef  = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (desktopRef.current === null) return;
        
        function update () {
            if (desktopRef.current === null) return;
            
            const style = getComputedStyle(desktopRef.current);
            const columns = style.gridTemplateColumns.split(" ").length;
            const rows = style.gridTemplateRows.split(" ").length;

            dispatch(DesktopActions.dimensions(rows, columns));
        };

        const obs = new ResizeObserver(update);
        obs.observe(desktopRef.current);
        update();

        return () => obs.disconnect();
    }, []);

    return (
        <div 
            className='fixed inset-0 top-11 bottom-0 w-full z-10 pointer-events-auto'
            id='DESKTOP'
            ref={desktopRef}
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill, minmax(${dimensions.width}px, 1fr))`,
                gridTemplateRows: `repeat(auto-fill, minmax(${dimensions.width*dimensions.widthToHeight}px, 1fr))`,
                width: "100%",
            }} 
        >
            {Object.keys(nodes).map((id: string) => {
                const node = nodes[id];
                if (node.parent === "desktop") 
                    return <DNode node={node} key={node.uuid}/>
                else 
                    return null
            })}
        </div>
    )
}

function isInSelectionArea (sa: SelectionAreaSlice, ref: React.RefObject<HTMLDivElement|null>) {
    if (!sa.isActive) return false
    if (ref.current === null) return false
    const rect = ref.current.getBoundingClientRect();

    const minX = Math.min(sa.x0, sa.x1);
    const maxX = Math.max(sa.x0, sa.x1);
    const minY = Math.min(sa.y0, sa.y1);
    const maxY = Math.max(sa.y0, sa.y1);

    return (
        rect.left < maxX &&
        rect.right > minX &&
        rect.top < maxY &&
        rect.bottom > minY
    );
}

const MAX_NAME_LENGTH = 12

function DNode ({node}:{
    node: FSNode,
}) {
    const ds = useSelector((state: RootState) => state.desktopState)
    const sa = useSelector((state: RootState) => state.selectionArea)
    const ss = useSelector((state: RootState) => state.selectedState)
    const isSelected = ("DNODE_" + node.uuid) in ss.selected
    const selfRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            style={{
                gridColumn: ds.nodes[node.uuid].x + 1,
                gridRow: ds.nodes[node.uuid].y + 1
            }}
            className='w-full h-full flex flex-col items-center p-1 pointer-events-none'
        >
            <div 
                id={"DNODE_" + node.uuid} 
                className={`${isSelected ? "bg-node-bg-selected" : ""} ${isInSelectionArea(sa, selfRef) ? "bg-node-bg-selected" : "hover:bg-node-bg-hover"} w-full flex flex-col items-center p-1 duration-200 rounded-sm pointer-events-auto DNODE`}
                ref={selfRef}
            >
                <img 
                    src={getIcon(node)}
                    className='object-contain pointer-events-none'
                    style={{width: `${ds.dimensions.width*ds.dimensions.widthToImageSize}px`, height: `${ds.dimensions.width*ds.dimensions.widthToImageSize}px`}}
                />
                <p className='text-xs text-white grow-0 w-full max-w-full text-funnel text-center wrap-break-word pointer-events-none'>{node.name.length > MAX_NAME_LENGTH && !isSelected ? node.name.slice(0, MAX_NAME_LENGTH) + "..." : node.name}</p>

            </div>
        </div> 
    )
}