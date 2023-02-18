import Style from './style.module.scss';

import { useState, useEffect } from 'react';
import useWhatsappContext from '../../../../hook/useWhatsappContext';
import ChatMessageText from '../ChatMessageText';


import { AiOutlineCloudDownload } from 'react-icons/ai';

const ChatMessageSticker = ({ chatMessage }) => {

    const { downloadMessageMedia, loadAndSetState } = useWhatsappContext();
    const [zoom, setZoom] = useState(false);

    const handleDownloadMedia = async (chatMessage) => {
        if (chatMessage)
            return await downloadMessageMedia(chatMessage._data.id.remote, chatMessage.id.id);
    }

    useEffect(() => {
        if (!chatMessage.mediaContent)
            handleDownloadMedia(chatMessage).then(() => {
                loadAndSetState();
            })
    }, [])

    return (
        <div className={Style.container}>
            {chatMessage.mediaContent ? (
                <img
                    src={`data:${chatMessage.mediaContent.mimetype};base64,${chatMessage.mediaContent.data}`}
                    onClick={() => setZoom(!zoom)}
                    alt='WhatsApp Full'
                    style={zoom ? {
                        width: '100%',
                        height: '100%',
                        cursor: 'zoom-out'
                    } : { cursor: 'zoom-in' }}
                />) :
                (<p>Carregando sticker..</p>)
            }
        </div>
    )
}

export default ChatMessageSticker