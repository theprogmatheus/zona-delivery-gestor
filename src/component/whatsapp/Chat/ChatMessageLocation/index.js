import Style from './style.module.scss';

import { GoLocation } from 'react-icons/go';

const ChatMessageLocation = ({ chatMessage }) => {
    return (
        <a className={Style.container} href={`https://maps.google.com/?q=${chatMessage._data.lat},${chatMessage._data.lng}`} target='_blank' rel="noreferrer">
            <img src={`data:image/png;base64,${chatMessage.body}`} alt='WhatsApp Location Preview' style={{ width: '120px', height: '120px' }} />
            <p><GoLocation /> Localização</p>
        </a>
    )
}

export default ChatMessageLocation