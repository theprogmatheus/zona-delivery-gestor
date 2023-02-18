import { NotificationManager } from 'react-notifications';

const usePrinter = () => {
    const print = async (order) => {
        const error = await window.ipcRenderer.invoke('invoice.printInvoice', JSON.stringify(order))
        if (error)
            NotificationManager.error(error, 'Erro ao tentar imprimir')
    }

    return {
        print
    }
}
export default usePrinter;