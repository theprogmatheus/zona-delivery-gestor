import Style from './style.module.scss';

import { useState } from 'react';

import OrderResume from '../../component/page/order/OrderResume';
import OrderDetails from '../../component/page/order/OrderDetails';
import useOrderContext from './../../hook/useOrderContext';

import { RiNewspaperLine } from 'react-icons/ri';

const OrderPage = () => {

    const { orders, selectedOrder, setSelectedOrder, isOrderScheduled } = useOrderContext();

    const [orderTiming, setOrderTiming] = useState();
    const [orderFilter, setOrderFilter] = useState('');
    const [search, setSearch] = useState('');

    const createOrderGroup = (status, amount) => {
        //PLACED, CONFIRMED, CANCELLED, DISPATCHED, READY_TO_PICKUP, CONCLUDED

        let groupName = '';
        switch (status) {
            case "PLACED":
                groupName = "Novo"
                break;

            case "CONFIRMED":
                groupName = "Em Preparo"
                break;

            case "CANCELLED":
                groupName = "Cancelado"
                break;

            case "DISPATCHED":
                groupName = "Despachado"
                break;

            case "READY_TO_PICKUP":
                groupName = "Pronto"
                break;

            case "CONCLUDED":
                groupName = "Concluído"
                break;

            default:
                groupName = "Outros";
                break;
        }
        return (
            <div className={Style.orderGroup}>
                <p className={Style.orderGroupName}>{groupName}</p>
                <p className={Style.orderGroupAmount}>{amount} Pedido{amount > 1 ? 's' : ''}</p>
            </div>
        )
    }

    const renderSidebar = () => {
        // PLACED, CONFIRMED, DISPATCHED, READY_TO_PICKUP, CONCLUDED, CANCELLED,

        let ordersToShow = orders || [];

        if (orderTiming)
            ordersToShow = ordersToShow.filter((order) => isOrderScheduled(order))
        else
            ordersToShow = ordersToShow.filter((order) => !isOrderScheduled(order))

        if (orderFilter)
            ordersToShow = applyOrderFilters(ordersToShow);

        if (search)
            ordersToShow = ordersToShow.filter((order) => JSON.stringify(order).toLowerCase().includes(search.toLocaleLowerCase()));


        let groups = [
            ordersToShow?.filter((order) => order.status === 'PLACED'),
            ordersToShow?.filter((order) => order.status === 'CONFIRMED'),
            ordersToShow?.filter((order) => order.status === 'DISPATCHED'),
            ordersToShow?.filter((order) => order.status === 'READY_TO_PICKUP'),
            ordersToShow?.filter((order) => order.status === 'CONCLUDED'),
            ordersToShow?.filter((order) => order.status === 'CANCELLED'),
        ];
        return (
            <div className={Style.orders}>
                {ordersToShow?.length > 0 ?
                    (<>
                        {groups?.map((group, index) => group.length > 0 && (
                            <div key={index}>
                                {createOrderGroup(group[0].status, group.length)}
                                {group.map((item, index) => <OrderResume key={index} order={item} active={item.id === selectedOrder} onClick={() => setSelectedOrder(item.id)} />)}
                            </div>
                        ))}
                    </>)
                    :
                    (
                        <div className={Style.noOrders}>
                            <h1><RiNewspaperLine /></h1>
                            <h3>Não há nada para exibir</h3>
                        </div>
                    )}
            </div>
        )
    }

    const applyOrderFilters = (orders) => {
        return orders?.filter((order) => {
            switch (orderFilter) {

                case "order.new":
                    return order.status === 'PLACED';

                case "order.status.done":
                    return order.orderType === 'TAKEOUT' && order.status === 'DISPATCHED';

                case "order.status.dispached":
                    return order.orderType === 'DELIVERY' && order.status === 'DISPATCHED';

                case "order.status.confirmed":
                    return order.status === 'CONFIRMED';

                case "order.status.cancelled":
                    return order.status === 'CANCELLED';

                case "order.status.concluded":
                    return order.status === 'CONCLUDED';

                case "order.type.takeout":
                    return order.orderType === 'TAKEOUT';

                case "order.type.delivery":
                    return order.orderType === 'DELIVERY';

                case "order.channel.whatsapp":
                    return order.channel === 'WHATSAPP';

                case "order.channel.ifood":
                    return order.channel === 'IFOOD';

                case "order.channel.ifood.digital_catalog":
                    return order.channel === 'IFOOD' && order.ifoodOrder?.salesChannel === 'DIGITAL_CATALOG';

                default:
                    return false;
            }
        })
    }


    return (
        <div className={Style.container}>
            <div className={Style.sidebar}>
                <div className={Style.panel}>
                    <div className={Style.scheduleAndNow}>
                        <button className={orderTiming !== 'SCHEDULED' ? Style.active : ''} onClick={() => setOrderTiming(null)}>
                            Agora
                            {orders?.find((order) => order.status === 'PLACED' && !isOrderScheduled(order)) &&
                                <span className={Style.amountSpan}>
                                    {orders.filter((order) => order.status === 'PLACED' && !isOrderScheduled(order)).length}
                                </span>
                            }
                        </button>
                        <button className={orderTiming === 'SCHEDULED' ? Style.active : ''} onClick={() => setOrderTiming('SCHEDULED')}>
                            Agendados
                            {orders?.find((order) => isOrderScheduled(order)) &&
                                <span className={Style.amountSpan}>
                                    {orders.filter((order) => isOrderScheduled(order)).length}
                                </span>
                            }
                        </button>
                    </div>
                    <div className={Style.searchAndFilters}>
                        <input type='search' onChange={(e) => setSearch(e.target.value)} placeholder='Buscar pedido' value={search} />
                        <select onChange={(e) => setOrderFilter(e.target.value)}>
                            <option value=''>Todos os Pedidos</option>
                            <option value='order.new'>Pendente</option>
                            <option value='order.status.confirmed'>Em preparo</option>
                            <option value='order.status.done'>Pronto</option>
                            <option value='order.status.dispached'>Despachado</option>
                            <option value='order.status.cancelled'>Cancelado</option>
                            <option value='order.status.concluded'>Concluido</option>
                            <option value='order.type.takeout'>Pedidos para retirada</option>
                            <option value='order.type.delivery'>Pedidos para entregar</option>
                            <option value='order.channel.whatsapp'>Pedidos feito no WhatsApp</option>
                            <option value='order.channel.ifood'>Pedidos feito no IFood</option>
                            <option value='order.channel.ifood.digital_catalog'>Pedidos feito no IFood - Cardápio Digital</option>
                        </select>
                    </div>
                </div>
                {renderSidebar()}
            </div>
            <div className={Style.order}>
                <OrderDetails order={orders?.filter((order) => order.id === selectedOrder)[0]} />
            </div>
        </div>
    )
}

export default OrderPage