import Style from './style.module.scss';
import { useState, useEffect, useRef } from 'react';

import useWhatsappContext from './../../../../hook/useWhatsappContext';

const ChatMessageAudio = ({ chatMessage }) => {

    const { downloadMessageMedia } = useWhatsappContext();
    const [audio, setAudio] = useState(chatMessage?.mediaContent);
    const audioRef = useRef();


    useEffect(() => {
        if (!chatMessage?.mediaContent)
            downloadMessageMedia(chatMessage._data.id.remote, chatMessage.id.id).then(setAudio)
        // eslint-disable-next-line
    }, [])

    function handlePlay() {
        const audios = document.body.getElementsByTagName("audio");
        if (audios) {
            for (let i = 0; i < audios.length; i++) {
                const audio = audios[i];
                if (audio !== audioRef.current) {
                    audio.pause();
                }
            }
        }
    }
    return (
        <div className={Style.container}>
            <audio ref={audioRef} controls="controls" autobuffer="autobuffer" onPlay={handlePlay}>
                {audio && (<source src={`data:${audio.mimetype.split(';')[0]};base64,${audio.data}`} />)}
            </audio>
        </div>
    )
}

export default ChatMessageAudio