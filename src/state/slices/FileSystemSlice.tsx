import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import filesystemMapJson from "../../Assets/filesystem_map.json"

export enum FSNodeType {
    File = "FileSystemFile",
    Folder = "FileSystemFolder",
}

export interface FSNode {
    name: string
    uuid: string
    parent: string
	icon: string
	content: string
    readonly: boolean
	creationDate: number
    type: FSNodeType
}

export interface FileSystem {
    [path: string]: FSNode;
}

const filesystemMap = filesystemMapJson as FSNode[]

export function fileSystemFromJson (): FileSystem {
	let fs: FileSystem = {};
    for (let i = 0; i < filesystemMap.length; i++) {
		const node = filesystemMap[i]
		fs[node.uuid] = node as FSNode 
    }
	return fs;
}

export function getUuidFromId (s: string): string { 
    return s.slice(s.indexOf("_") + 1)
}

export function getTypeFromId (id: string) {
	return id.split("_", 1)[0]
}

export function isSubFolder (node: string, target: string) {
	const nodeUuid = getUuidFromId(node)
	const targetUuid = getUuidFromId(target)
	const targetNode = filesystemMap.find((item) => item.uuid === targetUuid)

	if (!targetNode || targetNode.type !== FSNodeType.Folder || nodeUuid === targetUuid)
		return false

	const visited = new Set<string>()
	let currentNode = filesystemMap.find((item) => item.uuid === nodeUuid)

	while (currentNode && currentNode.parent !== "") {
		if (currentNode.parent === targetUuid)
			return true

		if (visited.has(currentNode.parent))
			return false

		visited.add(currentNode.parent)
		currentNode = filesystemMap.find((item) => item.uuid === currentNode?.parent)
	}

	return false
}

export function desktopStateFromJson (): Record<string, {x: number, y: number}> {
	let nodes: Record<string, {x: number, y: number}> = {};
	let count = 0;
    for (let i = 0; i < filesystemMap.length; i++) {
		const node = filesystemMap[i]
		if (node.parent === "desktop"){
			nodes[node.uuid] = {x: count, y: 0}
			count++;
		}
    }
	return nodes;
}





const initialState: FileSystem = fileSystemFromJson()

const FileSystemSlice = createSlice({
    name: "fileSystem",
    initialState,
    reducers: {
        add (state, action:PayloadAction<FSNode[]>){
            for (let i = 0; i < action.payload.length; i++){
                state[action.payload[i].uuid] = action.payload[i]
            }
        },
        move: {
            reducer (state, action:PayloadAction<{destination: string, uuids: string[]}>) {
                const { destination, uuids } = action.payload

                if (state[destination].type !== FSNodeType.Folder) 
                    return

                for(let i = 0; i < uuids.length; i++){
                    state[uuids[i]].parent = destination
                }
            },
            prepare (destination: string, uuids: string[]){
                return {
                    payload: {destination, uuids}
                }
            }
        },
        remove (state, action:PayloadAction<string[]>){
            for (let i = 0; i < action.payload.length; i++){
                delete state[action.payload[i]]
            }
        },
    }
})

export const FileSystemActions = FileSystemSlice.actions;
export default FileSystemSlice.reducer;