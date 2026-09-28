import { useEffect, useRef } from 'react';
import { type RootState } from '../state/store';
import { useSelector } from 'react-redux';

const Music = () => {
    const audioDiv = useRef<HTMLAudioElement>(null)
    const volume = useSelector((state: RootState) => state.system.volume)
    const music = useSelector((state: RootState) => state.system.music)

    useEffect(() => {
        if (!audioDiv.current) return
        music.active ? audioDiv.current.play() : audioDiv.current.pause()
        audioDiv.current.volume = volume.value/100;
    }, [music])

    return (
        <>
            <audio ref={audioDiv} id="audio_tag" src={`/music/${music.list[music.current].name}.mp3`} />
        </>
    )
}

export default Music