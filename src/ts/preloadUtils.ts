import { useEffect, useState, useRef } from "react";

export const forceLoadImage = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = (err) => reject(err);
    });
};

// const forceLoadFont = async (fontFamily: string, fontUrl: string): Promise<void> => {
//     try {
//         const font = new FontFace(fontFamily, `url(${fontUrl})`);
//         const loadedFont = await font.load();
//         document.fonts.add(loadedFont);
//     } catch (error) {
//         console.error(`Failed to load font: ${fontFamily}`, error);
//     }
// };

export const forceLoadVideo = async (videoUrl: string): Promise<string | undefined> => {
    try {
        const response = await fetch(videoUrl);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Failed to preload video', error);
    }
};

export enum MediaType {
    Image = "IMAGE",
    Video = "VIDEO",
    Unknown = "UNKNOWN"
}

export const useForceLoad = (src: string, type: MediaType) => {
    const [isReady, setIsReady] = useState(false);
    const [url, setUrl] = useState("");
    
    const blobUrlRef = useRef<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        
        setIsReady(false);
        setUrl("");

        const load = async () => {
            try {
                if (type === MediaType.Image) {
                    const imageUrl = await forceLoadImage(src);
                    if (isMounted) setUrl(imageUrl);
                } else if (type === MediaType.Video) {
                    const videoUrl = await forceLoadVideo(src);
                    if (videoUrl) {
                        blobUrlRef.current = videoUrl;
                        if (isMounted) setUrl(videoUrl);
                    }
                }
                
                if (isMounted) setIsReady(true);
            } catch (error) {
                console.error("Error force-loading assets", error);
                if (isMounted) setIsReady(true);
            }
        }

        load();

        return () => {
            isMounted = false;

            if (blobUrlRef.current && type === MediaType.Video) {
                URL.revokeObjectURL(blobUrlRef.current);
                blobUrlRef.current = null;
            }
        }
    }, [src, type]);

    return [url, isReady] as const; 
}