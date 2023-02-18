const DefaultSettings =
{
    restaurant: {
        label: "Restaurante",
        title: "Configurações do restaurante",
        values: {
            id: {
                label: "Restaurante",
                type: "select",
            },
            ifoodWidget: {
                label: "Habilitar widget do IFood",
                type: "boolean",
                value: true
            }
        }
    },

    orders: {
        label: "Pedidos",
        title: "Configurações dos pedidos",
        values: {
            autoConfirm: {
                label: "Confirmar pedidos automáticamente",
                type: "boolean",
                value: false
            },
            autoConfirmDelay: {
                label: "Delay para aceitar o pedido automáticamente (em segundos)",
                type: "number",
                value: 4
            }
        }
    },

    printer: {
        label: "Impressora",
        title: "Configurações de impressora",
        values: {
            enabled: {
                label: "Usar impressora",
                type: "boolean",
                value: false
            },
            silent: {
                label: "Imprimir direto (ignorar caixa de impressão)",
                type: "boolean",
                value: false
            },
            deviceName: {
                label: "Dispositivo",
                type: "select",
                options: []
            },
            paperSize: {
                label: "Largura do papel",
                type: "number",
                value: 80
            },
            awaysBold: {
                label: "Imprimir em negrito",
                type: "boolean",
                value: false
            },
            margins: {
                label: "Margens",
                type: "form",
                value: {
                    top: {
                        label: "CIMA",
                        type: "number",
                        value: "0"
                    },
                    bottom: {
                        label: "BAIXO",
                        type: "number",
                        value: "0"
                    },
                    left: {
                        label: "ESQUERDA",
                        type: "number",
                        value: "0"
                    },
                    right: {
                        label: "DIREITA",
                        type: "number",
                        value: "0"
                    },
                }
            },
            fontSize: {
                label: "Tamanho da fonte",
                type: "number",
                value: 10
            },
            copies: {
                label: "Cópias a serem impressas",
                type: "number",
                value: 1
            },

            previewMode: {
                label: "Modo de vizualização",
                type: "boolean",
                value: true
            },

            autoPrinter: {
                label: "Imprimir automáticamente ao aceitar um pedido",
                type: "boolean",
                value: false
            }
        }
    },
    chatbot: {
        label: "ChatBot",
        title: "Configurações do ChatBot",
        values: {
            enabled: {
                label: "Habilitar ChatBot",
                type: "boolean",
                value: false
            },
            menu: {
                label: "Cardápio",
                type: "select",
            },
            workTimes: {
                label: "Horários de atendimento (HH:mm:ss - HH:mm:ss)",
                type: "collection",
                ofType: "string",
                value: [
                    "18:00:00 - 23:30:00"
                ]
            },
            triggers: {
                label: "Gatilhos",
                type: "map",
                labelKey: "Mensagem",
                labelValue: "Gatilho",
                value: {
                    "Boa noite": "bot.greetings",
                    "Quero fazer um pedido": "order.create"
                }
            },
            triggersResponses: {
                label: "Respostas de gatilhos",
                type: "map",
                labelKey: "Gatilho",
                labelValue: "Resposta",
                value: {
                    "bot.greetings": "Boa noite como posso ajudar?"
                }
            },
            messages: {
                label: "Mensagens",
                type: "form",
                value: {
                    orderResume: {
                        label: "RESUMO DE PEDIDO",
                        type: "text",
                        value: "*Resumo do Pedido*\n\n*CLIENTE*\n\nNome: {customer.name}\nFone: {customer.phone}\n------------------------------\n*ITENS*\n\n{items}\n------------------------------\n*ENDEREÇO*\n\n{address}\n------------------------------\n*PAGAMENTO*\n\n{total}\nPagamento no {payments}\n------------------------------"
                    },
                    orderConfirmed: {
                        label: "Pedido Confirmado",
                        type: "text",
                        value: "Seu pedido #{order.simpleId} está em preparo!\nQuando seu pedido ficar pronto eu te aviso por aqui. 😉"
                    },
                    orderDispatched: {
                        label: "Pedido Despachado",
                        type: "text",
                        value: "Hey, psiu! seu pedido #{order.simpleid} acabou de sair para a entrega. 🏍\nFique atento ao portão, que seu lanche vai chegar logo logo. 😋"
                    },
                    orderReadyToPickup: {
                        label: "Pedido Pronto",
                        type: "text",
                        value: "Hey, psiu! seu pedido #{order.simpleid} já está pronto para retirada. 😋"
                    },
                    orderCancelled: {
                        label: "Pedido Cancelado",
                        type: "text",
                        value: "Poxa 😕, seu pedido #{order.simpleId} foi cancelado!"
                    },
                }
            }
        }
    },
    delivery: {
        label: "Entregas",
        title: "Configurações de entregas",
        values: {
            restaurantAddress: {
                label: "Coordenadas do Restaurante",
                type: "form",
                value: {
                    latitude: {
                        label: "LATITUDE",
                        type: "text",
                        value: "0"
                    },
                    longitude: {
                        label: "LONGITUDE",
                        type: "text",
                        value: "0"
                    },
                }
            },
            otherFees: {
                label: "Calculadora de taxas não definidas",
                type: "form",
                value: {
                    min: {
                        label: "Taxa mínima",
                        type: "number",
                        value: 3
                    },
                    max: {
                        label: "Taxa máxima",
                        type: "number",
                        value: 10
                    },
                    perkm: {
                        label: "Taxa por KM",
                        type: "number",
                        value: 1.15
                    }
                }
            },
            fees: {
                label: "Taxas de Entrega (Por Bairro)",
                type: "map",
                labelKey: "Bairro",
                labelValue: "Taxa",
                value: {}
            }
        }
    }
}
export default DefaultSettings 