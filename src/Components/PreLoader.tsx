import { useDispatch } from "react-redux"
import { useEffect } from "react";
import { PreloaderActions } from "../state/slices/PreloaderState";
import  { forceLoadImage, forceLoadVideo, MediaType } from "../ts/preloadUtils";

export const PRELOAD = {
    LOCKED_SCREEN_BG: "/videos/locked_screen_sm.mp4",
    DESKTOP_BG: "/videos/desktop_sm.mp4",
    PROFILE_PICTURE: "/images/TengoLomidze.webp"
}

const getMediaType = (src: string): MediaType => {
    const cleanSrc = src.split("?")[0].split("#")[0]
    const extension = cleanSrc.split(".").pop()?.toLowerCase()
    if (!extension) return MediaType.Unknown

    const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "m4v"]
    const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"]

    if (videoExtensions.includes(extension)) 
        return MediaType.Video
    if (imageExtensions.includes(extension))
        return MediaType.Image
    return MediaType.Unknown
};

const PreLoader = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        Object.values(PRELOAD).forEach(async (src) => {
            dispatch(PreloaderActions.add(src))

            let url = "";
            const type = getMediaType(src)
            try {
                if (type === MediaType.Image) {
                    url = (await forceLoadImage(src)) ?? "";
                } else if (type === MediaType.Video) {
                    url = (await forceLoadVideo(src)) ?? "";
                }
            } catch (error) {
                console.error(`Failed to preload media: ${src}`, error);
            }

            dispatch(PreloaderActions.set(src, url))
        })
    }, [])

    return (
        <div className="absolute opacity-0">
            <p className="font-jakarta">preloader</p>
            <p className="font-funnel">preloader</p>
            <p className="font-anurati">preloader</p>
        </div>
    )
}

export default PreLoader