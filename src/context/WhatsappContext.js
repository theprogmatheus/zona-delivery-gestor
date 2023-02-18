import { createContext, useState, useEffect } from "react";
export const WhatsappContext = createContext();

export const WhatsappContextProvider = ({ children }) => {

    const [state, setState] = useState({})
    const [activeChat, setActiveChat] = useState();
    const [messages, setMessages] = useState([]);

    const load = async () => {
        const result = await window.ipcRenderer.invoke('whatsapp.current');
        if (result)
            return JSON.parse(result)
        return {};
    }

    const loadAndSetState = async () => {
        const loaded = await load();
        setState(loaded);
    }

    const sendMessage = async (remote, message) => {
        return await window.ipcRenderer.invoke('whatsapp.sendMessage', remote, message);
    }

    const toggleSessionPause = async (sessionId) =>
        await window.ipcRenderer.invoke('whatsapp.session.handlePause', sessionId);

    const fetchSessionMessages = async (sessionId) =>
        await window.ipcRenderer.invoke('whatsapp.session.fetchMessages', sessionId);


    const downloadMessageMedia = async (sessionId, messageId) =>
        await window.ipcRenderer.invoke('whatsapp.session.downloadMessageMedia', sessionId, messageId);

    const start = async () =>
        await window.ipcRenderer.invoke('whatsapp.start');

    const stop = async () =>
        await window.ipcRenderer.invoke('whatsapp.stop');

    const restart = async () =>
        await window.ipcRenderer.invoke('whatsapp.restart');

    const logout = async () =>
        await window.ipcRenderer.invoke('whatsapp.logout');

    const loadSession = async (sessionId) => {
        const session = await window.ipcRenderer.invoke('whatsapp.loadSession', sessionId);
        await loadAndSetState();
        return session;
    }


    useEffect(() => {
        if (window.ipcRenderer) {
            loadAndSetState()
            if (window.onWhatsappEvent) {
                window.onWhatsappEvent(() => {
                    loadAndSetState()
                })
            }
        }
        // eslint-disable-next-line
    }, [])


    return (
        <WhatsappContext.Provider
            value={{
                state,
                start,
                stop,
                restart,
                logout,
                toggleSessionPause,
                fetchSessionMessages,
                downloadMessageMedia,
                loadAndSetState,
                sendMessage,
                activeChat,
                setActiveChat,
                messages,
                setMessages,
                loadSession
            }}
        >
            {children}
        </WhatsappContext.Provider>
    )
}
