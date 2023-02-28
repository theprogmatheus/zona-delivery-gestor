
const main = () => document.getElementById("main");

function formatCurrency(value) {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function add(element, parent = main()) {
    if (element)
        parent.appendChild(element);

    return element;
}

function create(elementName, classes, innerHTML, fontSize = 1) {
    const element = document.createElement(elementName);
    if (classes)
        classes.forEach((className) => element.classList.add(className))

    if (innerHTML)
        element.innerHTML = innerHTML;

    if (fontSize)
        element.style.fontSize = `${window.invoiceSettings.fontSize * fontSize}px`;

    return element;
}


function renderHeader(order) {
    const header = create("section", ['header'])
    add(create("h3", ["title"], order.restaurant.displayName, 1.5), header)
    add(header);
}

function renderOrderInfos(order) {
    add(create("br"));
    add(create("h5", null, `${order.channel}: #${order.simpleId}`, 1.3));



    const orderInfosSection = create("section", ["orderInfos"])

    add(create("p", null, `VIA: ${order.channel}${order.channel === 'IFOOD' ? ` [${order.ifoodOrder.merchant.name}]` : ''}`), orderInfosSection)
    add(create("p", null, `DATA: ${new Date(order.createdAt).toLocaleString()}`), orderInfosSection)
    add(create("p", null, `ENTREGA PREVISTA: ${new Date(order.deliveryDateTime).toLocaleTimeString()}`), orderInfosSection)
    if (order.orderType === 'DELIVERY')
        add(create("p", null, `TIPO DE ENTREGA: ${order?.ifoodOrder?.delivery?.deliveredBy === 'IFOOD' ? 'PARCEIRA' : 'PRÓPRIA'}`), orderInfosSection)





    add(orderInfosSection);
}

function renderCustomer(order) {
    const customerSection = create("section", ["customer"]);
    add(create("h5", null, 'CLIENTE:'), customerSection)
    add(create("br"), customerSection);
    add(create("p", null, `NOME: ${order.customer.name}`), customerSection);
    if (order?.ifoodOrder?.customer?.documentNumber)
        add(create("p", null, `CPF: ${order.ifoodOrder.customer.documentNumber}`), customerSection);
    add(create("p", null, `TELEFONE: ${order.channel === 'IFOOD' ? `${order.ifoodOrder.customer.phone.number}${order.ifoodOrder.salesChannel !== 'DIGITAL_CATALOG' ? ` ID: ${order.ifoodOrder.customer.phone.localizer}` : ''}` : formatNumber(order.customer.phone)}`), customerSection); // verifica se é do ifood, se for mostra o telefone do ifood
    add(create("br"), customerSection);

    if (order.orderType === 'DELIVERY') {
        add(create("p", null, `ENDEREÇO: ${order.address.formatted}`), customerSection)
        if (order?.ifoodOrder?.delivery?.observations && add(create("p", null, `OBS: ${order.ifoodOrder.delivery.observations}`), customerSection));
    } else {
        add(create("p", null, 'ESTE PEDIDO É PARA RETIRADA NO LOCAL'), customerSection)
    }

    add(customerSection);
}


function renderItems(order) {
    const itemsSection = create("section", ["items"]);

    add(create("h5", null, "ITENS:"), itemsSection)

    order.items?.forEach((item) => {

        const itemDiv = create("div", ["item"]);

        add(create("p", ["amount"], item.amount), itemDiv)
        add(create("p", ["description"], item.productName), itemDiv)
        add(create("p", ["price"], formatCurrency(item.amount * item.productPrice)), itemDiv)

        add(itemDiv, itemsSection)

        item.aditionals?.forEach((aditional) => {
            const aditionalDiv = create("div", ["item", "aditional"])

            add(create("p", ["amount"], ""), aditionalDiv)
            add(create("p", ["description"], `+${item.amount * aditional.amount} ${aditional.productName}`), aditionalDiv)
            add(create("p", ["price"], formatCurrency(item.amount * aditional.amount * aditional.productPrice)), aditionalDiv)


            add(aditionalDiv, itemsSection)
        })
        if (item.note) {
            const observationDiv = create("div", ["item", "aditional"])

            add(create("p", ["amount"], ""), observationDiv)
            add(create("p", ["description"], `OBS: ${item.note}`), observationDiv)
            add(create("p", ["price"], ""), observationDiv)


            add(observationDiv, itemsSection)
        }


    })

    add(itemsSection);
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

function renderPayments(order) {
    const paymentsSection = create("section", ["payments"]);

    paymentsSection.style.textTransform = 'uppercase';


    add(create("h5", null, "PAGAMENTO:"), paymentsSection)
    add(create("br"), paymentsSection);

    const subTotalDiv = create("div", ["row"]);
    add(create("p", null, "SUB-TOTAL:"), subTotalDiv);
    add(create("p", null, formatCurrency(order.total.subTotal)), subTotalDiv);
    add(subTotalDiv, paymentsSection);

    {
        extractBenefits(order)?.map((benefit) => {
            const div = create("div", ["row"]);
            add(create("p", null, `${benefit.name}:`), div);
            add(create("p", null, formatCurrency(-benefit.value)), div);
            add(div, paymentsSection);
        })
    }

    if (order.total.deliveryFee) {
        const div = create("div", ["row"]);
        add(create("p", null, "TAXA DE ENTREGA:"), div);
        add(create("p", null, formatCurrency(order.total.deliveryFee)), div);
        add(div, paymentsSection);
    }

    {
        extractExtraFees(order).map((extraFee) => {
            const div = create("div", ["row"]);
            add(create("p", null, `${extraFee.name}:`), div);
            add(create("p", null, formatCurrency(extraFee.value)), div);
            add(div, paymentsSection);
        })
    }

    const totalDiv = create("div", ["row"]);
    add(create("p", null, "TOTAL:"), totalDiv);
    add(create("p", null, formatCurrency(order.total.orderAmount)), totalDiv);
    add(totalDiv, paymentsSection);

    if (order.payment.prepaid > 0) {
        const prePaidDiv = create("div", ["row"]);
        add(create("p", null, "VALOR PAGO:"), prePaidDiv);
        add(create("p", null, formatCurrency(-order.payment.prepaid)), prePaidDiv);
        add(prePaidDiv, paymentsSection);
    }

    add(create("br"), paymentsSection);

    const div = create("div", ["row"]);
    add(create("p", null, "COBRAR DO CLIENTE:"), div);
    add(create("p", null, formatCurrency(order.payment.pending)), div);
    add(div, paymentsSection);


    if (order.total.orderAmount > 0) {
        add(create("br"), paymentsSection);

        const paymentMethodDiv = create("div", ["row"]);
        add(create("p", null, "FORMA DE PAGAMENTO:"), paymentMethodDiv);
        add(create("p", null, formatPaymentMethod(order)), paymentMethodDiv);
        add(paymentMethodDiv, paymentsSection);

        if (order.payment.methods[0].cash?.changeFor) {
            add(create("br"), paymentsSection);
            add(create("p", null, `LEVAR ${formatCurrency(order.payment.methods[0].cash.changeFor - order.payment.pending)} DE TROCO PARA O CLIENTE.`), paymentsSection);
        }
    }

    add(paymentsSection);
}

function renderFooter(order) {
    const footer = create("section");
    const center = create("center");

    add(create("br"), center)


    new QRCode(add(create("div"), center), {
        text: order.id,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    add(create("br"), center)
    add(create("h5", null, 'Agradecemos a Preferência'), center)
    add(create("br"), center)


    add(center, footer);
    add(footer);
}

function renderOrderJson(order) {
    const element = document.createElement("pre");
    element.innerHTML = JSON.stringify(order, null, 2);
    main().appendChild(element);
}


function renderOrder(order) {
    document.title = `#${order.simpleId}`;

    if (window?.invoiceSettings?.awaysBold)
        main().style = 'font-weight: bold';

    renderHeader(order);
    renderOrderInfos(order);
    renderCustomer(order);
    renderItems(order);
    renderPayments(order);
    renderFooter(order);

    // renderOrderJson(order);
}



function reset() {
    let invoiceElement = document.getElementById("main");
    document.body.removeChild(invoiceElement);
    invoiceElement = document.createElement('div');
    invoiceElement.id = 'main';
    document.body.appendChild(invoiceElement)
}

window.renderInvoice = function () {
    const order = window.invoiceOrder;

    if (order) {
        reset();
        renderOrder(order);


    }
}