import Style from './style.module.scss';
import { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import useLoadingScreen from './../../hook/useLoadingScreen';
import useWhatsappContext from './../../hook/useWhatsappContext';

import Chat from '../../component/whatsapp/Chat';
import ChatPreview from '../../component/whatsapp/ChatPreview';
import ButtonAsync from './../../component/ButtonAsync';

import { BsFillPlayFill, BsFillStopFill, BsWhatsapp } from 'react-icons/bs';
import { AiOutlineReload } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import { useLocation } from "react-router";

const WhatsappPage = () => {

  const location = useLocation();
  const { state, sendMessage, activeChat, setActiveChat, start, stop, restart, logout, loadSession } = useWhatsappContext();
  const { JSX, setLoading, loading, setLoadingMessage } = useLoadingScreen(((!state?.ready) && (!state?.authenticationQrCode)), false);
  const [onlyPausedSessions, setOnlyPausedSessions] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search)?.get("session");
    if (sessionId)
      loadSession(sessionId).then(() => setActiveChat(sessionId));
  }, [])


  // dentro da sessão do whatsapp, eu quero acessar algumas informações...
  // chat para atendimento humano (caso o robô não consiga resolver), configurações do chatbot
  useEffect(() => {
    setLoading(!(state?.ready || state?.authenticationQrCode))
    setLoadingMessage(state?.loading ? `${state.loading.message} (${state.loading.percent}%)` : 'Aguarde..')
    // eslint-disable-next-line
  }, [state, activeChat])



  function renderChats() {
    const sessions = Object.values(state.sessions).filter(session => ((onlyPausedSessions && session.paused) || !onlyPausedSessions) && JSON.stringify(session).toLocaleLowerCase().includes(search?.toLocaleLowerCase()));

    if (sessions.length > 0)
      return sessions.map((session) =>
        <ChatPreview
          key={session.id}
          active={activeChat === session.id}
          session={session}
          onClick={() => setActiveChat(session.id)}
        />
      )
    else
      return (
        <div className={Style.noChats}>
          <h3><BsWhatsapp /></h3>
          <p>Nenhuma conversa encontrada</p>
        </div>
      )
  }

  return (
    <div className={Style.container}>
      {state?.running ? (
        <>

          {!loading && (
            state.ready ? (
              <>
                <ul className={Style.chats}>
                  <li className={Style.sessionSelector}>
                    <p onClick={() => setOnlyPausedSessions(false)} className={!onlyPausedSessions ? Style.sessionSelectorActive : ''}>Todos</p>
                    <p onClick={() => setOnlyPausedSessions(true)} className={onlyPausedSessions ? Style.sessionSelectorActive : ''}>Atendente</p>
                  </li>
                  <li className={Style.chatSearch}>
                    <input type='search' onChange={e => setSearch(e.target.value)} value={search} placeholder={`🔎 Buscar conversa`} />
                  </li>
                  {renderChats()}
                </ul>

                <div className={Style.content}>
                  <div className={Style.contentChat}>
                    <Chat session={state.sessions[activeChat]} messages={state.sessions[activeChat]?.messages} disabled={(!state.sessions[activeChat]?.paused)} handleMessage={(message) => {
                      if (message && message.trim() !== '')
                        sendMessage(activeChat, message)
                    }} />
                  </div>
                </div>
              </>

            ) : (
              <>
                {state.authenticationQrCode && (
                  <div className={Style.qrCode}>
                    <h3>ENTRAR COM O WHATSAPP</h3>
                    <QRCodeSVG value={state.authenticationQrCode} />
                    <p>
                      Para inicar você precisar se autenticar com seu WhatsApp,
                      abra o aplicativo do WhatsApp vai nos três pontinhos no lado superior direito,
                      e aperte em 'Aparelhos conectados', logo depois você vai em 'Conectar um aparelho',
                      e finalmente escaneie o QR-Code acima.
                    </p>
                  </div>
                )}
              </>
            )
          )}
          {JSX}
        </>
      ) : (
        <div className={Style.qrCode}>
          <BsWhatsapp />
          <h3>WhatsApp</h3>
          <p>
            Aqui você pode gerenciar o atendimento via WhatsApp junto ao gestor de pedidos, para começar a usar o WhatsApp, aperta no botão de iniciar na aba acima.
          </p>
        </div>)}
      <div className={Style.controlPanel}>
        <ButtonAsync className={`${Style.controlButtonStart}  ${state?.running && Style.disabled}`} action={async () => await start()}><BsFillPlayFill /></ButtonAsync>
        <ButtonAsync className={`${Style.controlButtonStop} ${!state?.running && Style.disabled}`} action={async () => await stop()}><BsFillStopFill /></ButtonAsync>
        <ButtonAsync className={`${Style.controlButtonRestart} ${!state?.running && Style.disabled}`} action={async () => await restart()}><AiOutlineReload /></ButtonAsync>
        <ButtonAsync className={`${Style.controlButtonLogout} ${(!state?.running || !state.authenticated || !state?.ready) && Style.disabled}`} action={async () => await logout()}><FiLogOut /></ButtonAsync>
      </div>
    </div>
  )
}

export default WhatsappPage