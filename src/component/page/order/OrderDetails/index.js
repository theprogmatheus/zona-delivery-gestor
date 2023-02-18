import Style from './style.module.scss';
import { BsWhatsapp, BsFillGeoAltFill, BsPrinter, BsFillChatLeftTextFill } from 'react-icons/bs';


import usePrinter from './../../../../hook/usePrinter';
import useCurrency from './../../../../hook/useCurrency';
import useOrderContext from './../../../../hook/useOrderContext';

import ButtonAsync from './../../../ButtonAsync';
import { QRCodeSVG } from 'qrcode.react';

import { Link } from 'react-router-dom';

const OrderDetails = ({ order }) => {

    const { print } = usePrinter();
    const { formatCurrency } = useCurrency();
    const { confirmOrder, dispatchOrder, cancelOrder, isOrderScheduled } = useOrderContext();

    const handleButton = async (event, action) => {
        if (action) {
            event.target.disabled = true;
            await action();
            event.target.disabled = false;
        }
    }
    const formatStatus = (order) => {

        switch (order?.status) {
            case "PLACED":
                if (isOrderScheduled(order))
                    return 'Agendado';
                else
                    return 'Novo Pedido!';
            case "CONFIRMED":
                return 'Em Preparo';
            case "READY_TO_PICKUP":
                return 'Pedido Pronto';
            case "DISPATCHED":
                return 'Despachado';
            case "CONCLUDED":
                return 'Concluído';
            case "CANCELLED":
                return 'Cancelado';
            default:
                return order.status;
        }
    }

    function formatPaymentMethod(order) {
        if (order) {
            const payment = order.payment;
            const paymentMethod = payment.methods[0];
            const paymentMethodName = paymentMethod.method;

            let cardBrand = paymentMethod?.card?.brand?.toLowerCase();
            if (cardBrand)
                cardBrand = `${cardBrand[0].toUpperCase()}${cardBrand.substring(1)}`.replace('_', ' ');
            let walletName = paymentMethod?.wallet?.name;
            if (walletName)
                walletName = walletName.replace('_', ' ');

            switch (paymentMethodName) {
                case "CARD":
                    return "Cartão";

                case "DEBIT":
                    return `Débito - ${cardBrand}${order.channel === 'IFOOD' && ` via ${paymentMethod.type === 'ONLINE' ? 'IFood' : 'Loja'}`}`;

                case "CREDIT":
                    return `Crédito - ${cardBrand}${order.channel === 'IFOOD' && ` via ${paymentMethod.type === 'ONLINE' ? 'IFood' : 'Loja'}`}`;

                case "PIX":
                    return "Pix";

                case "CASH":
                    return "Dinheiro";

                case "MEAL_VOUCHER":
                    return `Vale Refeição - ${cardBrand}${order.channel === 'IFOOD' && ` via ${paymentMethod.type === 'ONLINE' ? 'IFood' : 'Loja'}`}`;

                case "FOOD_VOUCHER":
                    return `Vale Alimentação - ${cardBrand}${order.channel === 'IFOOD' && ` via ${paymentMethod.type === 'ONLINE' ? 'IFood' : 'Loja'}`}`;

                case "DIGITAL_WALLET":
                    return `Carteira Digital - ${cardBrand} ${walletName && `(${walletName})`}`;

                case "GIFT_CARD":
                    return "Cartão Presente";

                case "EXTERNAL":
                    return "Pagamento Externo";

                default:
                    return paymentMethodName;
            }
        }

    }

    function extractExtraFees(order) {
        const extraFees = [];
        const additionalFees = order?.ifoodOrder?.additionalFees;
        if (additionalFees) {
            additionalFees.forEach((aditionalFee) => {
                extraFees.push({
                    name: aditionalFee.description,
                    description: aditionalFee.fullDescription,
                    value: aditionalFee.value
                })
            })
        }
        return extraFees;
    }

    function extractBenefits(order) {
        const benefits = [];
        order?.ifoodOrder?.benefits?.forEach((benefit) => {
            const sponsors = benefit.sponsorshipValues;
            if (sponsors) {
                sponsors.forEach((sponsor) => {
                    if (sponsor.value > 0) {
                        benefits.push({
                            name: sponsor.description,
                            value: sponsor.value
                        })
                    }
                })
            }
        })
        return benefits;
    }

    function formatNumber(number) {
        if (number.length > 11 && number.length < 14) {
            let countryCode;

            let numberLen = 10;
            if (number.length >= 13)
                numberLen = 11;

            if (number.length >= 12) {
                const countryCodeIndexEnd = number.length - numberLen;
                countryCode = number.slice(0, countryCodeIndexEnd);
                number = number.slice(countryCodeIndexEnd, number.length)
            }

            number = number.replace(/\D/g, "");             //Remove tudo o que não é dígito
            number = number.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
            number = number.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos

            return `${countryCode ? `+${countryCode} ` : ''}${number}`;
        }
        return number;
    }

    return order && (
        <div className={Style.container}>

            <div className={Style.info}>
                <p className={Style.title}>{order.simpleId} - Via {order.channel}{order?.ifoodOrder?.salesChannel === 'DIGITAL_CATALOG' && <> - Cardápio Digital</>}, {order?.ifoodOrder?.merchant?.name || order?.restaurant?.displayName}</p>
                <p className={`${Style.status} ${order.status === 'CANCELLED' ? Style.error : order.status === 'CONCLUDED' ? Style.success : Style.warning}`}>{formatStatus(order)}</p>
            </div>

            <div className={Style.info}>
                <p>Pedido feito em {new Date(order.createdAt).toLocaleString()}</p>
                {order.orderType === 'TAKEOUT' ? <p>[ Retirar no estabelecimento ]</p> : <p>Entrega prevista para {new Date(order.deliveryDateTime).toLocaleTimeString()}</p>}

            </div>

            <div className={Style.customer}>

                <div className={Style.details}>

                    <div className={Style.row}>
                        <p>Nome: </p>
                        <p>{order.customer.name}</p>
                    </div>
                    {order.channel === 'IFOOD' ?

                        <div className={Style.row}>
                            <p>Telefone:</p>
                            <p>{order.ifoodOrder.customer.phone.number}{order.ifoodOrder.salesChannel !== 'DIGITAL_CATALOG' && <> ID: {order.ifoodOrder.customer.phone.localizer}</>}</p>
                        </div> :

                        <div className={Style.row}>
                            <p>Telefone:</p>
                            <Link
                                to={order?.customer?.whatsappId ? `/whatsapp?session=${order.customer.whatsappId}` : '#'}
                                rel='noreferrer'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textDecoration: 'none'
                                }}
                            >
                                <span>{formatNumber(order.customer.phone)}</span>
                                <BsWhatsapp style={{
                                    marginLeft: '5px'
                                }} />
                            </Link>
                        </div>
                    }
                    {order?.ifoodOrder?.customer?.documentNumber &&
                        <div className={Style.row}>
                            <p>CPF: </p>
                            <p>{order?.ifoodOrder?.customer?.documentNumber}</p>
                        </div>
                    }
                    <div className={Style.row}>
                        <p>Endereço: </p>

                        <div style={{ marginLeft: '50px' }}>

                            {order.orderType === 'TAKEOUT' ?
                                (<p>[ Retirar no estabelecimento ]</p>) :

                                (
                                    <a href={`https://maps.google.com/?q=${order?.address?.latitude}, ${order?.address?.longitude}`} target='_blank'
                                        rel='noreferrer'>
                                        <p>{order?.address?.formatted}</p>
                                        <BsFillGeoAltFill style={{
                                            marginLeft: '5px'
                                        }} />
                                    </a>
                                )
                            }

                        </div>
                    </div>
                </div>

                <div className={Style.qrCode}>
                    <QRCodeSVG value={order.id} width='125px' height='125px' bgColor='rgb(255, 240, 240)' />
                </div>
            </div>

            <div className={Style.order}>

                <ul className={Style.orderList}>

                    {
                        order?.items?.map((item, index) => (
                            <li key={index} className={Style.orderListItem}>

                                <div className={Style.orderListItemContent}>
                                    <p className={Style.amount}>{item.amount}</p>
                                    <p className={Style.name}>{item.productName}</p>
                                    <p className={Style.price}>{formatCurrency(item.amount * item.productPrice)}</p>
                                </div>

                                {item.aditionals &&
                                    (
                                        <ul className={Style.orderListItemExtras}>
                                            {
                                                item.aditionals.map((aditional, index) => (
                                                    <li key={index} className={Style.orderListItemExtrasItem}>
                                                        <p className={Style.amount}>{item.amount * aditional.amount}</p>
                                                        <p className={Style.name}>{aditional.productName}</p>
                                                        <p className={Style.price}>{formatCurrency(item.amount * aditional.amount * aditional.productPrice)}</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )
                                }


                                {item.note && (
                                    <p className={Style.itemNote}>
                                        <BsFillChatLeftTextFill />
                                        <span>{item.note}</span>
                                    </p>
                                )}
                            </li>

                        ))
                    }
                </ul>


                {order.note && (
                    <p className={Style.orderNote}>
                        {order.note}
                    </p>
                )}

                {order.total.subTotal !== order.total.orderAmount ? (
                    <div className={Style.resume}>
                        <p>Sub-total:</p>
                        <p>{formatCurrency(order.total.subTotal)}</p>
                    </div>
                ) : (<></>)}

                {extractBenefits(order)?.map((benefit, index) => (
                    <div className={Style.resume} key={index}>
                        <p>{benefit.name}:</p>
                        <p>{formatCurrency(-benefit.value)}</p>
                    </div>
                ))}


                {order.total.deliveryFee ? (
                    <div className={Style.resume}>
                        <p>Taxa de entrega:</p>
                        <p>{formatCurrency(order.total.deliveryFee)}</p>
                    </div>
                ) : (<></>)}

                {extractExtraFees(order).map((extraFee, index) => (
                    <div className={Style.resume} key={index}>
                        <p>{extraFee.name}:</p>
                        <p>{formatCurrency(extraFee.value)}</p>
                    </div>
                ))}

                <div className={Style.resume}>
                    <p>Total:</p>
                    <p>{formatCurrency(order.total.orderAmount)}</p>
                </div>

                {order.payment.prepaid > 0 &&
                    <div className={Style.resume}>
                        <p>Valor pago:</p>
                        <p>{formatCurrency(-order.payment.prepaid)}</p>
                    </div>
                }


                <div className={Style.resume}>
                    <p>Cobrar do cliente:</p>
                    <p>{formatCurrency(order.payment.pending)}</p>
                </div>

                <div className={Style.resume}>
                    <p>Forma de pagamento:</p>
                    <p>{formatPaymentMethod(order)}</p>
                </div>

                {order.payment.methods[0].cash?.changeFor > 0 && (
                    <div className={Style.resume}>
                        <p></p>
                        <p>Levar {formatCurrency(order.payment.methods[0].cash?.changeFor - order.payment.pending)} de troco para o cliente</p>
                    </div>
                )}


            </div>

            <div className={Style.footer}>

                {
                    order.status !== 'PLACED' ? (
                        <button className={`${Style.button} ${Style.printerButton}`} onClick={(event) => handleButton(event, async () => await print(order))}>
                            <BsPrinter />
                        </button>
                    ) : (<div></div>)
                }

                {
                    (order.status === 'PLACED' || order.status === 'CONFIRMED') && (
                        <div className={Style.buttons}>
                            <ButtonAsync className={`${Style.button} ${Style.no}`} action={async () => await cancelOrder(order)}>Cancelar</ButtonAsync>

                            {!isOrderScheduled(order) && (
                                <>
                                    {
                                        order.status === 'PLACED' ?
                                            (<button className={`${Style.button} ${Style.yes}`} onClick={(event) => handleButton(event, async () => await confirmOrder(order))} >Confirmar</button>) :
                                            (<button className={`${Style.button} ${Style.yes}`} onClick={(event) => handleButton(event, async () => await dispatchOrder(order))}>{(order.orderType === 'TAKEOUT' || order?.ifoodOrder?.delivery?.deliveredBy === 'IFOOD') ? 'Pedido pronto' : 'Despachar'}</button>)
                                    }
                                </>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default OrderDetails