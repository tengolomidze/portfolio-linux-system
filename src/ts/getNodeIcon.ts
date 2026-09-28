import { type FSNode, FSNodeType } from "../state/slices/FileSystemSlice"

export const getIcon = (node: FSNode) => {
    if (node.icon !== "") 
        return node.icon

    if (node.type === FSNodeType.File){
        const strings = node.name.split('.')
        const extension = node.name.split('.')[strings.length - 1].toLowerCase()
        switch(extension){
            case "txt": return '/icons/files/txt.svg'
            case "html": return '/icons/files/html.svg'
            case "mp3": return '/icons/files/audio.svg'
            case "json" : return '/icons/files/json.svg'
            case "pdf" : return '/icons/files/pdf.svg'
            default: return '/icons/files/txt.svg'
        }
    } else {
        switch(node.name){
            case "desktop": return '/icons/folders/folder-desktop.svg' 
            case "documents": return '/icons/folders/folder-documents.svg'
            case "downloads": return '/icons/folders/folder-download.svg'
            case "games": return '/icons/folders/folder-games.svg'
            case "home": return '/icons/folders/folder-home.svg'
            case "pictures": return '/icons/folders/folder-pictures.svg'
            case "projects": return '/icons/folders/folder-script.svg'
            case "tengolomidze": return '/icons/folders/folder-user.svg'
            case "videos": return '/icons/folders/folder-videos.svg'
            default: return '/icons/folders/folder.svg' 
        }   
    }
}