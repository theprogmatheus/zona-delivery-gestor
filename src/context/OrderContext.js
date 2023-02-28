import { createContext, useState, useEffect } from "react";
import useWhatsappContext from '../hook/useWhatsappContext';
import usePrinter from './../hook/usePrinter';
import newOrderMP3 from './../assets/audio/new-order.mp3';
import useAppContext from './../hook/useAppContext';
import CancelOrder from './../component/modal/CancelOrder';
import { NotificationManager } from "react-notifications";
import AlertSound from "../component/AlertSound";
import CancellationRequestModal from './../component/modal/CancellationRequest';
export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {

    const whatsapp = useWhatsappContext();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState();
    const [newOrderAudio] = useState(new Audio(newOrderMP3));
    const { api, webSocketAPI, modal, settings } = useAppContext();
    const { print } = usePrinter();
    const [confirmedOrders, setConfirmedOrders] = useState([]);

    useEffect(() => {
        if (settings?.values?.restaurant?.id) {
            api.requests.listOrders(settings.values.restaurant.id).then(setOrders)


            const destination = `/topic/${settings.values.restaurant.id}/events`;
            webSocketAPI.subscribe(destination, (frame) => {
                if (frame?.body) {
                    const event = JSON.parse(frame.body);
                    if (event)
                        handleEvent(event);

                }
            })
 
            /*
            const eventPolling = async (restaurantId) =>
                api.requests.eventPolling(restaurantId).then((events) => handleEvents(restaurantId, events));

            const eventPollingInterval = setInterval(() => eventPolling(settings.values.restaurant.id), 15000);
            return () => {
                clearInterval(eventPollingInterval);
            };
            */
        }
    }, [settings])

    useEffect(() => {

        const newOrders = orders?.filter(isNewOrder);

        handleNewOrderSound(newOrders);

        const autoConfirm = settings?.values?.orders?.autoConfirm;
        const autoConfirmDelay = settings?.values?.orders?.autoConfirmDelay;
        const autoConfirmTimeout = (newOrders?.length > 0 && autoConfirm) ? setTimeout(() => newOrders.forEach(confirmOrder), (autoConfirmDelay * 1000)) : -1;

        return () => {
            clearTimeout(autoConfirmTimeout)
        }

        // eslint-disable-next-line
    }, [orders])


    const handleNewOrderSound = (newOrders) => {
        if (newOrders?.length > 0) {
            newOrderAudio.loop = true;
            newOrderAudio.play();
        } else {
            newOrderAudio.pause();
            newOrderAudio.currentTime = 0;
        }
    }

    const isNewOrder = (order) => order.status === 'PLACED' && !isOrderScheduled(order);


    const isOrderScheduled = (order) => order?.status === 'PLACED' && order?.ifoodOrder?.orderTiming === 'SCHEDULED' &&
        (Date.now() < Date.parse(order?.ifoodOrder?.preparationStartDateTime));

    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    function handleEvent(event) {
        const data = event.data;

        switch (event.type) {


            case 'ORDER_UPDATE':

                const orderId = data.id;


                setOrders((orders) => {


                    if (orders && orders.map((order) => order.id).includes(orderId)) {



                        // atualiza o pedido
                        const index = orders.map((order) => order.id).indexOf(orderId);
                        if (index !== -1)
                            orders[index] = data;
                    } else {
                        // adiciona o pedido                
                        if (orders)
                            orders = [data, ...orders];
                        else orders = [data]
                    }

                    return [...removeDuplicates(orders)];
                });

                switch (data.status) {
                    case "CANCELLED":

                        modal.showWindow(<h3>Pedido cancelado!</h3>, <AlertSound><h3>O pedido #{data?.simpleId} foi cancelado!</h3></AlertSound>)
                        NotificationManager.error(`O pedido #${data?.simpleId} do IFood foi cancelado!`, 'Pedido do IFood cancelado!', 300000);


                        break;
                    default:
                        break;
                }
                break;

            case 'IFOOD_CONSUMER_CANCELLATION_REQUESTED':
                modal.showConfirm(<h3>Solicitação de Cancelamento</h3>, <CancellationRequestModal order={data} />, async (confirmed) => {
                    if (confirmed) {
                        await api.requests.ifoodAcceptCancellation(data.restaurant.id, data.id);
                        NotificationManager.success('Você aceitou o pedido de cancelamento do pedido #' + data.simpleId, 'Pedido de cancelamento aceito!')
                    } else {
                        await api.requests.ifoodDenyCancellation(data.restaurant.id, data.id);
                        NotificationManager.error('Você negou o pedido de cancelamento do pedido #' + data.simpleId, 'Pedido de cancelamento negado!')
                    }
                })
                break;
        }
    }

    const confirmOrder = async (order) => {
        if (!confirmedOrders.includes(order.id)) {
            setConfirmedOrders(prev => [...prev, order.id])

            if (order && order.status === 'PLACED') {
                const index = orders.indexOf(order);
                const result = await api.requests.confirmOrder(order.restaurant.id, order.id);
                if (result?.id) {
                    // deu certo!

                    setOrders((orders) => {
                        if (index !== -1)
                            orders[index] = result;
                        return [...orders];
                    })


                    // imprime a comanda caso esteja habilitado o autoPrinter
                    if (settings?.values?.printer?.autoPrinter)
                        print(order);

                    // envia uma mensagem no whatsapp, dizendo que o pedido foi aceito e está em preparo
                    if (order?.customer?.whatsappCustomerId) {
                        if (settings?.values?.chatbot?.messages?.orderConfirmed)
                            settings.applyPlaceholders(settings.values.chatbot.messages.orderConfirmed, { order }).then((message) => {
                                whatsapp.sendMessage(order.customer.whatsappCustomerId, message);
                            })
                    }
                }
            }
        }
    }

    const dispatchOrder = async (order) => {
        if (order) {
            const index = orders.indexOf(order);
            const result = await api.requests.dispatchOrder(order.restaurant.id, order.id);

            if (result?.id) {
                // deu certo!



                setOrders((orders) => {
                    if (index !== -1)
                        orders[index] = result;
                    return [...orders];
                })

                // envia uma mensagem no whatsapp dizendo que o pedido saiu para entrega
                if (order?.customer?.whatsappCustomerId) {
                    if (settings?.values?.chatbot?.messages?.orderDispatched)
                        settings.applyPlaceholders(order.orderType === 'DELIVERY' ? settings.values.chatbot.messages.orderDispatched : settings.values.chatbot.messages.orderReadyToPickup, { order }).then((message) => {
                            whatsapp.sendMessage(order.customer.whatsappCustomerId, message);
                        })
                }
            }
        }
    }


    const cancelOrder = async (order) => {
        if (order?.id) {
            const reason = "";
            // envia uma mensagem a pessoa dizendo que o pedido foi cancelado por alguma razão
            if (order?.customer?.whatsappCustomerId) {
                if (settings?.values?.chatbot?.messages?.orderCancelled)
                    settings.applyPlaceholders(settings.values.chatbot.messages.orderCancelled, { order, reason }).then((message) => {
                        whatsapp.sendMessage(order.customer.whatsappCustomerId, message);
                    })
            }


            if (order.channel === 'IFOOD') {
                const reasons = await api.requests.ifoodCancellationReasons(settings.values.restaurant.id, order.id);
                if (reasons && reasons.length > 0)
                    modal.showWindow(<h3>Cancelar Pedido do IFood #{order.simpleId}</h3>, <CancelOrder order={order} reasons={reasons} onCancel={() => { modal.closeAll() }} />)
                else
                    NotificationManager.error('Não é possível cancelar esse pedido no momento', 'Erro ao tentar cancelar o pedido do IFood', 30000)
            } else {
                modal.showConfirm(<h3>Cancelar pedido #{order.simpleId}</h3>, <p>Tem certeza de que deseja cancelar este pedido?</p>, (confirmed) => {
                    window.alert(`Você clicou em ${confirmed ? 'Sim' : 'Não'}`)
                })
            }
        }
    }




    return (
        <OrderContext.Provider
            value={{
                orders, setOrders,
                selectedOrder, setSelectedOrder,
                confirmOrder,
                dispatchOrder,
                cancelOrder,
                isOrderScheduled,
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}
