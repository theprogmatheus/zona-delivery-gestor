import Style from './style.module.scss';

import { useState } from 'react';
import useWhatsappContext from './../../../../hook/useWhatsappContext';

import { AiOutlineCloudDownload } from 'react-icons/ai';

const ChatMessageVideo = ({ chatMessage }) => {
    const { downloadMessageMedia, loadAndSetState } = useWhatsappContext();
    const [dowloading, setDownloading] = useState(false);

    const handleDownloadMedia = async (chatMessage) => {
        if (chatMessage) {
            setDownloading(true);
            return await downloadMessageMedia(chatMessage._data.id.remote, chatMessage.id.id);
        }
    }

    return chatMessage.mediaContent ? (
        <video className={Style.container} controls="controls" autobuffer="autobuffer">
            <source src={`data:${chatMessage.mediaContent.mimetype.split(';')[0]};base64,${chatMessage.mediaContent.data}`} />
        </video>

    ) : (
        <div className={Style.container}>
            {chatMessage._data.body ? <img src={`data:image/png;base64,${chatMessage._data.body}`} alt='WhatsApp Video' /> :
                <div className={Style.videoPreview}>
                    <p>Clique no botão acima para vizualizar este vídeo</p>
                </div>
            }

            {!dowloading && <button
                onClick={() => {
                    handleDownloadMedia(chatMessage).then(() => {
                        loadAndSetState();
                    })
                }}
            ><AiOutlineCloudDownload /></button>}
        </div>

    )
}

export default ChatMessageVideo