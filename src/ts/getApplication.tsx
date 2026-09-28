import type React from "react";
import { FSNodeType, type FSNode } from "../state/slices/FileSystemSlice";
import { WindowType, type Window } from "../state/slices/WindowManagerSlice";
import Firefox from "../Components/WindowManager/Applications/Firefox";
import FileExplorer from "../Components/WindowManager/Applications/FileExplorer";

const DEFAULT_WIDTH = 1100
const DEFAULT_HEIGHT= 650


export function getApplicationWindow (node: FSNode):Window {
    if (node.type === FSNodeType.File){
        const strings = node.name.split('.')
        const extension = node.name.split('.')[strings.length - 1].toLowerCase()
        switch(extension){
            case "pdf": return { name: "FireFox", uuid: node.uuid, type: WindowType.Firefox, data: {src: `${node.name}.webp`}, x0: window.innerWidth/2 - DEFAULT_WIDTH/2, y0: window.innerHeight/2 - DEFAULT_HEIGHT/2, x1: window.innerWidth/2 + DEFAULT_WIDTH/2, y1: window.innerHeight/2 + DEFAULT_HEIGHT/2, minimized: false, maximized: false } 
            default: return { name: node.name, uuid: node.uuid, type: WindowType.FileExplorer, data: null, x0: window.innerWidth/2 - DEFAULT_WIDTH/2, y0: window.innerHeight/2 - DEFAULT_HEIGHT/2, x1: window.innerWidth/2 + DEFAULT_WIDTH/2, y1: window.innerHeight/2 + DEFAULT_HEIGHT/2, minimized: false, maximized: false } 
        }
    } else {
        return { name: node.name, uuid: node.uuid, type: WindowType.FileExplorer, data: null, x0: window.innerWidth/2 - DEFAULT_WIDTH/2, y0: window.innerHeight/2 - DEFAULT_HEIGHT/2, x1: window.innerWidth/2 + DEFAULT_WIDTH/2, y1: window.innerHeight/2 + DEFAULT_HEIGHT/2, minimized: false, maximized: false } 
    }
}

export function getApplicationDiv (window: Window): React.ReactElement {

    switch(window.type){
        case WindowType.Firefox: return <Firefox window={window} key={window.uuid} />
        case WindowType.FileExplorer: return <FileExplorer window={window} key={window.uuid} />
        default: return <FileExplorer window={window} key={window.uuid} />
    }
}