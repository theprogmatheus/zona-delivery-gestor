import Style from './style.module.scss';
import NoProfilePicImage from './../../../assets/img/whatsapp-no-profilepic.jpg';
import useWhatsAppContext from './../../../hook/useWhatsappContext';

import { FaUser, FaRobot } from 'react-icons/fa';
import { AiFillAudio, AiFillPicture } from 'react-icons/ai';
import { CgFileDocument } from 'react-icons/cg';
import { BiSticker } from 'react-icons/bi';
import { BsCameraVideoFill } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import { GrAttachment } from 'react-icons/gr';
import { RiChatDeleteFill } from 'react-icons/ri';
import { HiPhoneMissedCall } from 'react-icons/hi';
import { MdOutlineMissedVideoCall } from 'react-icons/md';

const ChatPreview = ({ session, active, onClick }) => {

    const WhatsAppContext = useWhatsAppContext();


    function renderContactName() {
        const contact = session.contact;
        if (contact)
            return contact.name || session.phone;
    }

    
    function renderLastMessage() {
        if (session.messages.length > 0) {
            const message = session.messages[session.messages.length - 1];
            const body = message.body;
            const bodyResume = body.length > 50 ? `${body.slice(0, 50)}...` : body;
            let string = bodyResume;

            // html formatter
            const htmlFormat = [
                { symbol: '*', tag: 'b' },
                { symbol: '_', tag: 'em' },
                { symbol: '~', tag: 'del' },
                { symbol: '```', tag: 'code' },
            ];

            htmlFormat.forEach(({ symbol, tag }) => {
                if (!string) return;

                const regex = new RegExp(`\\${symbol}([^${symbol}]*)\\${symbol}`, 'gm');
                const match = string.match(regex);
                if (!match) return;

                match.forEach(m => {
                    let formatted = m;
                    for (let i = 0; i < 2; i++) {
                        formatted = formatted.replace(symbol, `<${i > 0 ? '/' : ''}${tag}>`);
                    }
                    string = string.replace(m, formatted);
                });
            });


            switch (message.type) {

                case "chat":
                    return <p dangerouslySetInnerHTML={{ __html: string }}></p>;

                case "location":
                    return <p><IoLocationSharp /> Localização</p>

                case "image":
                    return <p><AiFillPicture /> Imagem</p>

                case "ptt":
                case "audio":
                    return <p><AiFillAudio /> Audio</p>

                case "vcard":
                    // contato
                    return <p><IoMdContacts /> Contato</p>

                case "video":
                    return <p><BsCameraVideoFill /> Vídeo</p>

                case "sticker":
                    //figurinha
                    return <p><BiSticker /> Figurinha</p>

                case "document":
                    //documento
                    return <p><CgFileDocument /> {bodyResume}</p>

                case "revoked":
                    return <p><RiChatDeleteFill /> Mensagem apagada</p>

                case "call_log":
                    return <p>{message?._data?.subtype === 'miss_video' ? <MdOutlineMissedVideoCall /> : <HiPhoneMissedCall />} Chamada de {message?._data?.subtype === 'miss_video' ? 'vídeo' : 'voz'} perdida</p>;


                default:
                    return <p><GrAttachment /> Anexo</p>

            }

        }
        return <></>
    }


    function handlePause() {
        WhatsAppContext.toggleSessionPause(session.id).then(() => WhatsAppContext.loadAndSetState())
    }



    return (
        <li className={`${Style.chat} ${active && Style.active}`} onClick={onClick ? onClick : () => { }}>

            <div className={Style.profilePic}>
                <img src={session.profilePicUrl || NoProfilePicImage} alt='Imagem do Perfil' />
            </div>
            <div className={Style.profileDesc}>
                <h3>{renderContactName()}</h3>
                {renderLastMessage()}
            </div>
            <div className={Style.sessionStatus}>
                <span
                    className={`${Style.statusInfo} ${session.paused ? Style.paused : ''}`}
                    onClick={handlePause}
                >
                    {session.paused ? <FaUser /> : <FaRobot />}
                </span>
            </div>
        </li >
    )
}

export default ChatPreview