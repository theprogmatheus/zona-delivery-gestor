const DefaultSettings = {

    printer: {

        name: 'Configurações de Impressão',
        shortName: 'Impressão',
        data: {
            deviceName: {
                label: 'Nome da impressora',
                type: 'text',
                value: 'Minha Impressora'
            },
            paperSize: {
                label: 'Largura do papel térmico (em MM)',
                type: 'number',
                value: 80
            },
            printBrand: {
                label: "Qual o título das impressões",
                test: 'text',
                value: 'Zona Delivery'
            }
        }

    },

    whatsapp: {
        name: "Configurações do WhatsApp",
        shortName: "Whatsapp",
        data: {
            useWhatsappFeature: {
                label: "Usar recurso WhatsApp",
                type: "checkbox"
            },
            chatBotName: {
                label: "Qual o nome do(a) atendente do ChatBot?",
                type: "text",
                value: "Daniel"
            },
            startWorkTime: {
                label: "Que horas começa o expediente?",
                type: "time"
            },
            endWorkTime: {
                label: "Que horas acaba o expediente?",
                type: "time"
            },
            noWorkingMessage: {
                label: "Qual a resposta para clientes que mandam mensagens fora do expediente?",
                type: "text",
                value: "Nosso horário de atendimento é de segunda a sexta das 18:00 as 23:30."
            },
        }
    },

    about: {
        name: 'Sobre o Sistema',
        shortName: 'Sobre',
        noEditable: true,
        data: {
            appVersion: {
                label: 'Versão do Aplicativo',
                value: '1.0.3',
                type: 'text',
                disabled: true
            },
            devName: {
                label: 'Desenvolvido Por',
                value: 'Matheus Aguiar',
                disabled: true
            }
        }
    }

};

export default DefaultSettings;