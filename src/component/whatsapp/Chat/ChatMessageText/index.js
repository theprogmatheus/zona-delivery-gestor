import Style from './style.module.scss';
import { useState } from 'react';

const ChatMessageText = ({ chatMessage, maxLength = 1024 }) => {

    const [showMore, setShowMore] = useState(false);

    function getText() {

        let string = chatMessage.body;

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

        if (!showMore && chatMessage?.body?.length > maxLength) return chatMessage?.body.slice(0, maxLength);
        
        return string;
    }
    return (
        <div className={Style.container}>
            <p dangerouslySetInnerHTML={{ __html: getText() }}></p>
            {chatMessage?.body?.length > maxLength && (
                <button onClick={() => setShowMore(!showMore)}>{showMore ? 'Ler menos' : 'Ler mais'}</button>
            )}
        </div>
    )
}

export default ChatMessageText