import Style from './style.module.scss';

import { useState } from 'react';
import useWhatsappContext from './../../../../hook/useWhatsappContext';
import ChatMessageText from './../ChatMessageText';


import { AiOutlineCloudDownload } from 'react-icons/ai';

const ChatMessageImage = ({ chatMessage }) => {

    const { downloadMessageMedia, loadAndSetState } = useWhatsappContext();
    const [dowloading, setDownloading] = useState(false);
    const [zoom, setZoom] = useState(false);

    const handleDownloadMedia = async (chatMessage) => {
        if (chatMessage) {
            setDownloading(true);
            return await downloadMessageMedia(chatMessage._data.id.remote, chatMessage.id.id);
        }
    }

    return (
        <>
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
                    />
                ) :
                    (
                        <>
                            {chatMessage._data.body ? <img src={`data:image/png;base64,${chatMessage._data.body}`} alt='Imagem do WhatsApp' /> :
                                <div className={Style.imagePreview}>
                                    <p>Clique no botão acima para vizualizar esta imagem</p>
                                </div>
                            }

                            {!dowloading && <button
                                onClick={() => {
                                    handleDownloadMedia(chatMessage).then(() => {
                                        loadAndSetState();
                                    })
                                }}
                            >
                                <AiOutlineCloudDownload />
                            </button>}
                        </>
                    )}
            </div>
            {chatMessage?.body && <ChatMessageText chatMessage={chatMessage} />}
        </>
    )
}

export default ChatMessageImage