import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { desktopStateFromJson } from "./FileSystemSlice";

interface DesktopStateSlice{
    dimensions: {
        width: number,
        widthToHeight: number,
        widthToImageSize: number,
        widthToFontSize: number,
    }

    rows: number,
    columns: number,

    nodes: Record<string, {x: number, y: number}>
}

const initialState: DesktopStateSlice = {
    dimensions: {
        width: 80,
        widthToHeight: 90/80,
        widthToImageSize: 60/80,
        widthToFontSize: 16/80,
    },

    rows: 10,
    columns: 10,

    nodes: desktopStateFromJson()
}

const DesktopStateSlice = createSlice({
    name: "desktopNodes",
    initialState,
    reducers: {
        repositionNode: {
            reducer (state, action:PayloadAction<{key: string, x: number, y: number}>) {
                if (!(action.payload.key in state.nodes)) return
                state.nodes[action.payload.key] = getValidPosition(action.payload.x, action.payload.y, action.payload.key, state)
            },
            prepare (key: string, x: number, y: number) {
                return {
                    payload: {key, x, y}
                }
            }
        },

        repositionNodes: (state, action: PayloadAction<Record<string, {x: number, y: number}>>) => {
            for (const key in action.payload){
                if (!(key in state.nodes)) continue
                state.nodes[key] = getValidPosition(action.payload[key].x, action.payload[key].y, key, state)
            }
        },

        dimensions: {
            reducer (state, action:PayloadAction<{rows: number, columns: number}>) {
                state.rows = action.payload.rows
                state.columns = action.payload.columns
            },
            prepare (rows: number, columns: number) {
                return {
                    payload: {rows, columns}
                }
            }
        }
    }
})


const isOccupied = (x: number, y: number, key: string, ds: DesktopStateSlice): boolean =>
    Object.entries(ds.nodes).some(([nodeKey, node]) => nodeKey !== key && node.x === x && node.y === y)

const getValidPosition = (x: number, y: number, key: string, ds: DesktopStateSlice): { x: number, y: number } => {
    const totalSlots = ds.columns * ds.rows;
    let checked = 0;

    let rawIndex = Math.round(x) * ds.rows + Math.round(y);
    let validIndex = ((rawIndex % totalSlots) + totalSlots) % totalSlots;

    let currentX = Math.floor(validIndex / ds.rows);
    let currentY = validIndex % ds.rows;

    while (isOccupied(currentX, currentY, key, ds) && checked < totalSlots) {
        currentY += 1; 
        if (currentY >= ds.rows) {
            currentY = 0;
            currentX += 1; 
        }
        if (currentX >= ds.columns) {
            currentX = 0; 
        }
        checked++;
    }

    if (checked >= totalSlots) {
        console.warn("Desktop is full!");
        return { x: -1, y: -1 };
    }

    return { x: currentX, y: currentY };
};

export const DesktopActions = DesktopStateSlice.actions;
export default DesktopStateSlice.reducer;