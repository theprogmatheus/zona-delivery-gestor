import { useEffect } from 'react';

import AlertSoundMP3 from './../../assets/audio/alert-sound.mp3';

const AlertSound = ({ children }) => {

    useEffect(() => {
        // play

        const audio = new Audio(AlertSoundMP3);
        audio.loop = true;
        audio.play();
        
        return () => {
            audio.pause();
            // stop
        }
    }, [])


    return (
        <>
            {children}
        </>
    )
}

export default AlertSound 