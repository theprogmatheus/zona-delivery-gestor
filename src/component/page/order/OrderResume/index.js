import Style from './style.module.scss';

import useOrderContext from './../../../../hook/useOrderContext';
import ButtonAsync from './../../../ButtonAsync';

const OrderResume = ({ order, active, onClick }) => {

    const { isOrderScheduled, dispatchOrder } = useOrderContext();

    async function handleDispatch() {
        await dispatchOrder(order);
    }

    const getStatusTag = (order) => {
        switch (order?.status) {

            case "PLACED":
                if (isOrderScheduled(order))
                    return <p className={`${Style.status} ${Style.confirmed}`}>Agendado</p>
                else
                    return <p className={`${Style.status} ${Style.placed}`}>Novo Pedido ({parseInt(8 - (((Date.now() - (order?.ifoodOrder?.orderTiming === 'SCHEDULED' ? Date.parse(order.ifoodOrder.preparationStartDateTime) : Date.parse(order.createdAt))) / 1000) / 60))} min)</p>

            case "CONFIRMED":
                return <p className={`${Style.status} ${Style.confirmed}`}>Em Preparo</p>;

            case "READY_TO_PICKUP":
                return <p className={`${Style.status} ${Style.dispatched}`}>Pedido Pronto</p>;

            case "DISPATCHED":
                return <p className={`${Style.status} ${Style.dispatched}`}>Despachado</p>;

            case "CONCLUDED":
                return <p className={`${Style.status} ${Style.concluded}`}>Concluído</p>
            case "CANCELLED":
                return <p className={`${Style.status} ${Style.cancelled}`}>Cancelado</p>;
            default:
                return <></>;
        }
    }

    const formatDate = (date) => {
        if (date)
            return new Date(date).toLocaleString();
    }

    return order && (
        <div className={`${Style.container} ${active ? Style.active : order.status === 'PLACED' && Style.placed}`} onClick={onClick}>
            <h3 className={Style.title}>{order?.ifoodOrder?.merchant?.name || order?.restaurant?.displayName}</h3>
            <p className={Style.customer}>#{order.simpleId} - {order.customer.name}</p>
            {order?.orderType === 'DELIVERY' && <p>Entrega prevista para {new Date(order.deliveryDateTime).toLocaleTimeString()}</p>}
            {isOrderScheduled(order) && <p>Agendado para: {formatDate(order?.ifoodOrder?.preparationStartDateTime)}</p>}
            {getStatusTag(order)}
            <ul className={Style.tags}>
                <li>{order?.orderType === 'DELIVERY' ? (order?.ifoodOrder?.delivery?.deliveredBy === 'IFOOD' ? 'Entrega Parceira' : 'Entrega Própria') : 'Retirar no estabelecimento'}</li>
                <li>{order?.channel}</li>
                {order?.ifoodOrder?.orderTiming === 'SCHEDULED' && <li>Agendado</li>}
                {order?.ifoodOrder?.salesChannel && order?.ifoodOrder?.salesChannel === 'DIGITAL_CATALOG' && <li>Cardápio Digital</li>}
            </ul>
            <div className={Style.fastActions}>
                {order.status === 'CONFIRMED' &&
                    <ButtonAsync className={Style.dispatchActionButton} action={handleDispatch} loadingChildren='Aguarde..'>{order.orderType === 'TAKEOUT' ? 'Pedido pronto' : 'Despachar'}</ButtonAsync>
                }
            </div>
        </div>
    )
}

export default OrderResume