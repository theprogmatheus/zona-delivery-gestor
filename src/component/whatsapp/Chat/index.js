import Style from './style.module.scss';

import { useState, useEffect, useRef } from 'react';

import NoProfilePicImage from './../../../assets/img/whatsapp-no-profilepic.jpg';

import { BiSend } from 'react-icons/bi';
import { AiOutlineArrowDown, AiOutlineWarning } from 'react-icons/ai';
import { RiChatDeleteFill } from 'react-icons/ri';
import { FaUser, FaRobot } from 'react-icons/fa';
import { HiPhoneMissedCall } from 'react-icons/hi';
import { MdOutlineMissedVideoCall } from 'react-icons/md';
import { BsFillCartFill } from 'react-icons/bs';
import { BsWhatsapp } from 'react-icons/bs';

import ButtonAsync from './../../ButtonAsync';

import ChatMessageText from './ChatMessageText';
import ChatMessageImage from './ChatMessageImage';
import ChatMessageSticker from './ChatMessageSticker';
import ChatMessageLocation from './ChatMessageLocation';
import ChatMessageAudio from './ChatMessageAudio';
import ChatMessageVideo from './ChatMessageVideo';
import useWhatsappContext from '../../../hook/useWhatsappContext';

const Chat = ({ disabled, session, messages = [], handleMessage = () => { } }) => {

    const [inputMessage, setInputMessage] = useState('');
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatContentRef = useRef();
    const { loadAndSetState, toggleSessionPause } = useWhatsappContext();


    useEffect(() => {
        scrollToBottom();
    }, [messages])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputMessage && inputMessage !== '' && !disabled) {
            handleMessage(inputMessage);
            setInputMessage('');
        }
    }

    const scrollToBottom = () => {
        if (chatContentRef.current)
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }

    const renderChatMessage = (chatMessage) => {
        switch (chatMessage?.type) {

            case "chat":
                return <ChatMessageText chatMessage={chatMessage} />;

            case "location":
                return <ChatMessageLocation chatMessage={chatMessage} />;


            case "image":
                return <ChatMessageImage chatMessage={chatMessage} />;

            case "ptt":
            case "audio":
                return <ChatMessageAudio chatMessage={chatMessage} />;

            case "vcard":
            // contato

            case "video":
                return <ChatMessageVideo chatMessage={chatMessage} />

            case "sticker":
                //figurinha
                return <ChatMessageSticker chatMessage={chatMessage} />;

            case "revoked":
                return <p style={{ padding: '20px', display: "flex", alignItems: "center" }}><RiChatDeleteFill /> Mensagem Apagada</p>


            case "call_log":
                return <p style={{ padding: '25px' }}>{chatMessage?._data?.subtype === 'miss_video' ? <MdOutlineMissedVideoCall /> : <HiPhoneMissedCall />} Chamada de {chatMessage?._data?.subtype === 'miss_video' ? 'vídeo' : 'voz'} perdida</p>;

            case "document":
            //documento
            default:
                console.log(`Tipo de mensagem não suportado pelo chat: ${chatMessage?.type}`, chatMessage)
                return <p style={{ padding: '25px' }}><AiOutlineWarning /> {`Tipo de mensagem não suportado pelo chat: ${chatMessage?.type}`}</p>;
        }
    }

    function renderDateAndTime(message) {
        const date = new Date(message.timestamp * 1_000);
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    }

    function handleScroll(e) {
        setShowScrollButton(!((e.target.offsetHeight + e.target.scrollTop) >= e.target.scrollHeight - 100))
    }

    async function handlePause() {
        await toggleSessionPause(session.id);
        await loadAndSetState();
    }

    function renderContactName() {
        const contact = session.contact;
        if (contact)
            return contact.name || session.phone;
    }


    return (
        <div className={Style.container}>
            {session ? (
                <>


                    <div className={Style.header}>
                        <div className={Style.profile}>
                            <div className={Style.profilePic}>
                                <img src={session.profilePicUrl || NoProfilePicImage} alt='Imagem do Perfil' />
                            </div>

                            <div className={Style.profileDesc}>
                                <h3>{renderContactName()}</h3>
                            </div>
                        </div>
                        <div className={Style.controlPanel}>
                            <ButtonAsync enabled={false} ><BsFillCartFill /></ButtonAsync>
                            <ButtonAsync action={handlePause}> {session.paused ? <FaUser /> : <FaRobot />}</ButtonAsync>
                        </div>
                    </div>

                    {showScrollButton &&
                        <button
                            className={Style.scrollButton}
                            onClick={scrollToBottom}
                        >
                            <AiOutlineArrowDown />
                        </button>
                    }

                    <div
                        className={Style.chatContent}
                        ref={chatContentRef}
                        onScroll={handleScroll}>

                        {messages && messages.map((chatMessage, index) => (
                            <div
                                key={`${index}-${chatMessage.id.id}`}
                                className={`${Style.chatMessage} ${chatMessage.fromMe ? Style.chatMessageSelf : ''}`}
                            >
                                {renderChatMessage(chatMessage)}
                                <p className={Style.dateTimeMessage}>
                                    {renderDateAndTime(chatMessage)}
                                </p>

                            </div>
                        ))}
                    </div>

                    <form className={`${Style.chatInput} ${disabled && Style.disabled}`} onSubmit={handleSubmit}>

                        <input
                            className={Style.chatInputMessage}
                            type='text'
                            placeholder='Digite uma mensagem'
                            onChange={(e) => { (!disabled) && setInputMessage(e.target.value) }}
                            value={disabled ? 'Atendimento automático.' : inputMessage}
                        />

                        <button
                            className={Style.chatInputSubmit}
                            type='submit'
                        >{disabled ? <FaRobot /> : <BiSend />}</button>

                    </form>
                </>
            ) : (
                <div className={Style.noContent}>
                    <h3><BsWhatsapp />WhatsApp</h3>
                    <p>Aqui você pode gerenciar o atendimento via WhatsApp junto ao gestor de pedidos, para começar a usar o WhatsApp, aperta no botão de iniciar na aba acima.</p>
                </div>
            )}
        </div>
    )
}

export default Chat