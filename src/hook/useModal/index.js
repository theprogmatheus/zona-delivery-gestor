import Style from './style.module.scss';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export default function useModal() {

    const [windows, setWindows] = useState([]);

    function renderWindow() {

        const window = windows[windows.length - 1];

        const handleRemove = () => {
            setWindows((prev) => {
                prev = prev.filter((target) => target !== window);
                return [...prev];
            })
        }

        return (
            <div className={Style.modal}>
                {!window.isConfirm && <button className={Style.closeButton} onClick={handleRemove}><AiOutlineClose /></button>}


                {window.header && <div className={Style.header}>{window.header}</div>}
                {window.body && <div className={Style.body}>{window.body}</div>}
                {window.footer && <div className={Style.footer}>{window.footer}</div>}
            </div>
        )
    }

    const JSX = (
        <div className={Style.container} style={{ visibility: windows && windows.length > 0 ? 'visible' : 'hidden' }}>
            {windows && windows.length > 0 && renderWindow()}
        </div>
    )

    function closeAll() {
        setWindows([])
    }

    function closeWindow(window) {
        setWindows((prev) => {
            prev = prev.filter((target) => target !== window);
            return [...prev];
        })
    }

    function showConfirm(header, body, callBackConfirm = () => { }) {
        const window = {
            header,
            body,
            footer: (
                <div className={Style.confirmFooter}>
                    <button className={Style.buttonYes} onClick={() => handleConfirm(true)}>Aceitar</button>
                    <button className={Style.buttonNo} onClick={() => handleConfirm(false)}>Recusar</button>
                </div>
            ),
            isConfirm: true
        };

        const handleConfirm = (confirmed) => {
            callBackConfirm(confirmed);
            closeWindow(window)
        }

        setWindows((prev) => {
            prev.push(window)
            return [...prev];
        })

        return window;
    }

    function showWindow(header, body, footer) {
        const window = { header, body, footer };

        setWindows((prev) => {
            prev.push(window)
            return [...prev];
        })

        return window;
    }

    return {
        JSX,
        closeAll,
        showWindow,
        showConfirm,
        closeWindow
    }
}

