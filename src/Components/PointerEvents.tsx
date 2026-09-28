import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../state/store'
import { MouseActions } from '../state/slices/MouseSlice'
import { SelectedStateActions } from '../state/slices/SelectedState'
import { SelectionAreaActions } from '../state/slices/SelectionAreaSlice'
import { DesktopActions } from '../state/slices/DesktopStateSlice'
import { WindowManagerActions } from '../state/slices/WindowManagerSlice'

import { getTypeFromId, getUuidFromId } from '../state/slices/FileSystemSlice'
import { getApplicationWindow } from '../ts/getApplication'



export enum TargetType {
    DESKTOP = "DESKTOP",
    HEADER = "HEADER",
    DNODE = "DNODE",
    OTHER = "",

    WINDOW_T = "WINDOW-T",
    WINDOW_R = "WINDOW-R",
    WINDOW_B = "WINDOW-B",
    WINDOW_L = "WINDOW-L",
    WINDOW_TL = "WINDOW-TL",
    WINDOW_TR = "WINDOW-TR",
    WINDOW_BL = "WINDOW-BL",
    WINDOW_BR = "WINDOW-BR",
    WINDOW_M = "WINDOW-M",

    FILE_EXPLORER = "FILE-EXPLORER",
    FENODE = "FENODE",
}

const DRAG_THRESHOLD = 8
const DOUBLE_CLICK_THRESHOLD = 500

export default function PointerEvents () {
    const dispatch = useDispatch()

    const mouse = useSelector((state: RootState) => state.mouse)
    const fs = useSelector((state: RootState) => state.fileSystem)
    const ds = useSelector((state: RootState) => state.desktopState)
    const sa = useSelector((state: RootState) => state.selectionArea)
    const ss = useSelector((state: RootState) => state.selectedState)
    const wm = useSelector((state: RootState) => state.windowManager)

    const s = useRef({ mouse, fs, ds, sa, ss, wm })
    s.current = { mouse, fs, ds, sa, ss, wm }

    useEffect(() => {
        function pointerDown (e: PointerEvent) {
            if(e.button === 0) {
                dispatch(MouseActions.down(true, e.x, e.y))
                dispatch(SelectionAreaActions.start(e.x, e.y))

                const target = e.target as HTMLElement
                dispatch(MouseActions.startTarget(target.id))

                if (target.id === "")
                    return

                const targetUuid = getUuidFromId(target.id)
                const targetType = getTypeFromId(target.id)
                console.log(targetType)
                if (targetType === TargetType.DNODE){
                    if (!e.ctrlKey)
                        if (!(target.id in s.current.ss.selected))
                            dispatch(SelectedStateActions.clearAndAdd(target.id))
                        else
                            dispatch(SelectedStateActions.add(target.id))
                    else
                        dispatch(SelectedStateActions.toggle(target.id))
                } else if (targetType === TargetType.DESKTOP || targetType === TargetType.HEADER){
                    if (!e.ctrlKey)
                        dispatch(SelectedStateActions.clear())
                }  if (targetType.includes("WINDOW-")) {
                    dispatch(SelectedStateActions.clear())
                    const direction = targetType.split("-", 2)[1]
                    dispatch(WindowManagerActions.startMoving(targetUuid, direction, e.x, e.y))
                }
            }
        }
    
        window.addEventListener("pointerdown", pointerDown)
        return () => window.removeEventListener("pointerdown", pointerDown)
    }, [])
    


    useEffect(() => {
        function pointerMove (e: PointerEvent) {
            changeCursor(s.current.wm.isMoving, s.current.wm.direction)

            if(!s.current.mouse.isDown) return
            
            dispatch(MouseActions.position(e.x, e.y))
            dispatch(SelectionAreaActions.position(e.x, e.y))

            //const target = e.target as HTMLElement
            
            if (
                exceededDragTreshold(e.x, e.y, s.current.mouse.xDown, s.current.mouse.yDown) && 
                !s.current.mouse.isDragging
            ) dispatch(MouseActions.dragging(true))

            if (s.current.mouse.isDragging && 
                !s.current.sa.isActive && 
                (getTypeFromId(s.current.mouse.startTarget) === TargetType.DESKTOP || getTypeFromId(s.current.mouse.startTarget) === TargetType.HEADER)
            ) dispatch(SelectionAreaActions.active(true))

            if (s.current.mouse.isDragging && 
                !s.current.ss.isMoving && 
                Object.keys(s.current.ss.selected).length > 0
            ){
                dispatch(SelectedStateActions.moving(true))
                dispatch(SelectedStateActions.offset(e.x, e.y))
                let nodes: Record<string, {x: number, y: number}> = {}
                for (const id in s.current.ss.selected){
                    const pos = getPosFromId(id)
                    nodes[id] = {...pos}
                }
                dispatch(SelectedStateActions.positions(nodes))
            }

            if (s.current.wm.isMoving){
                dispatch(WindowManagerActions.move(e.x, e.y))
            }

        }
    
        window.addEventListener("pointermove", pointerMove)
        return () => window.removeEventListener("pointermove", pointerMove)
    }, [])



    useEffect(() => {
        function pointerUp (e: PointerEvent) {
            dispatch(MouseActions.down(false))
            dispatch(MouseActions.dragging(false))
            dispatch(SelectedStateActions.moving(false))
            dispatch(WindowManagerActions.stopMoving())

            const target = e.target as HTMLElement
            dispatch(MouseActions.endTarget(target.id))
            const targetUuid = getUuidFromId(target.id)
            const targetType = getTypeFromId(target.id)

            if (targetType === TargetType.DNODE){
                if (isDoubleClick(s.current.mouse.timeOfLastClick) && target.id === s.current.mouse.endTarget)
                    dispatch(WindowManagerActions.add([getApplicationWindow(s.current.fs[targetUuid])]))
                
                if(!e.ctrlKey && !s.current.mouse.isDragging)
                    dispatch(SelectedStateActions.clearAndAdd(target.id))
            }


            if(s.current.ss.isMoving){
                if (targetType === TargetType.DESKTOP){
                    let nodes: Record<string, {x: number, y: number}> = {}

                    for (const id in s.current.ss.selected){
                        nodes[getUuidFromId(id)] = getDesktopPos(
                            e.x + s.current.ss.selected[id].x - s.current.ss.offsetX + s.current.ds.dimensions.width/2, 
                            e.y + s.current.ss.selected[id].y - s.current.ss.offsetY + s.current.ds.dimensions.width*s.current.ds.dimensions.widthToHeight/2
                        )
                    }
                    dispatch(DesktopActions.repositionNodes(nodes))
                } if (targetType === TargetType.DNODE || targetType === TargetType.FENODE){
                    // for (const id in s.current.ss.selected){
                        
                    // }
                }
            }    

            if(s.current.sa.isActive){
                const elements = document.getElementsByClassName(TargetType.DNODE)
                for (let i = 0; i < elements.length; i++){
                    if (isInSelectionArea(
                        s.current.sa.x0, 
                        s.current.sa.x1, 
                        s.current.sa.y0, 
                        s.current.sa.y1, 
                        elements[i].getBoundingClientRect()
                    )) dispatch(SelectedStateActions.add(elements[i].id))
                }
            }
            
            dispatch(SelectionAreaActions.active(false))
        } 
    
        window.addEventListener("pointerup", pointerUp)
        return () => window.removeEventListener("pointerup", pointerUp)
    }, [])

    return null
}




const isDoubleClick = (t: number) => Date.now() - t <= DOUBLE_CLICK_THRESHOLD

function changeCursor(isMoving: boolean, direction: string) {
    if (isMoving) {
        if (direction === "T" || direction === "B")
            document.body.style.cursor = 'url(/icons/cursors/sizens.cur), auto'
        else if (direction === "L" || direction === "R")
            document.body.style.cursor = 'url(/icons/cursors/sizewe.cur), auto'
        else if (direction === "TL" || direction === "BR")
            document.body.style.cursor = 'url(/icons/cursors/sizenwse.cur), auto'
        else if (direction === "TR" || direction === "BL")
            document.body.style.cursor = 'url(/icons/cursors/sizenesw.cur), auto'
    } else {
        document.body.style.cursor = ''
    }
}

function exceededDragTreshold (x: number, y: number, xDown: number, yDown: number) {
    const dx = x - xDown
    const dy = y - yDown
    return dx*dx + dy*dy >= DRAG_THRESHOLD*DRAG_THRESHOLD
}

function isInSelectionArea (x0: number, x1: number, y0: number, y1: number, rect: DOMRect) {
    const minX = Math.min(x0, x1);
    const maxX = Math.max(x0, x1);
    const minY = Math.min(y0, y1);
    const maxY = Math.max(y0, y1);

    return (
        rect.left < maxX &&
        rect.right > minX &&
        rect.top < maxY &&
        rect.bottom > minY
    );
}

function getDesktopPos (itemX: number, itemY: number) {
    const desktop = document.getElementById(TargetType.DESKTOP)
    if (desktop === null) return { x: -1, y: -1 }
    
    const style = getComputedStyle(desktop)
    const { columns, rows } = {
        columns: style.gridTemplateColumns.split(" ").map(v => parseFloat(v)),
        rows: style.gridTemplateRows.split(" ").map(v => parseFloat(v)),
    }

    const rect = desktop.getBoundingClientRect()
    const x = itemX - rect.left
    const y = itemY - rect.top

    let col = -1, row = -1

    let acc = 0
    for (let i = 0; i < columns.length; i++) {
        acc += columns[i]
        if (x < acc) {
            col = i
            break
        }
    }

    acc = 0
    for (let i = 0; i < rows.length; i++) {
        acc += rows[i]
        if (y < acc) {
            row = i
            break
        }
    }

    return { x: col, y: row }
}

function getPosFromId ( id: string) {
    const element = document.getElementById(id)
    if (element === null) return { x: -1, y: -1 }
    const rect = element.getBoundingClientRect()
    return { x: rect.left, y: rect.top }
}
