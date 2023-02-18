import Style from './style.module.scss';
import AlertSound from './../../AlertSound';
import OrderDetails from './../../page/order/OrderDetails';
import { useState, useEffect } from 'react';

const CancellationRequestModal = ({ order }) => {

    const [showDetails, setShowDetails] = useState(false);
    const expireTime = Date.now() + 300_000;
    const [time, setTime] = useState(expireTime - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(expireTime - Date.now())
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])
    function handleShowOrder() {
        setShowDetails(prev => !prev)
    }

    function getTimer() {
        const date = new Date(time);
        return `${date.getMinutes()}:${date.getSeconds()}`;
    }


    return (order &&
        <AlertSound>
            <div className={Style.container}>
                <h3>Pedido #{order.simpleId}</h3>
                <p>O cliente solicitou o cancelamento do pedido #{order.simpleId}!</p>
                <p>Você deve aceitar ou recusar antes que o tempo acabe, Caso contrário, o cancelamento será aceito automáticamente.</p>

                <p className={Style.timer}>{getTimer()}</p>

                <button onClick={handleShowOrder}>{showDetails ? 'Ocultar' : 'Vizualizar'} pedido #{order.simpleId}</button>

                {showDetails && <OrderDetails order={order} />}
            </div>
        </AlertSound>
    )
}

export default CancellationRequestModal