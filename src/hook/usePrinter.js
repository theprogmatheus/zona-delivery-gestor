import { NotificationManager } from 'react-notifications';

import useAppContext from './useAppContext';

const usePrinter = () => {

    const { settings } = useAppContext();

    const print = async (order) => {
        if (window?.ipcRenderer) {
            const error = await window.ipcRenderer.invoke('invoice.printInvoice', JSON.stringify(order))
            if (error)
                NotificationManager.error(error, 'Erro ao tentar imprimir')
        } else {
            function Print() {
                const printWindow = window.open('/assets/html/invoice', 'PRINT', 'height=400,width=600');

                const script = document.createElement("script");
                script.innerHTML = `window.invoiceOrder=${JSON.stringify(order)};window.invoiceSettings=${JSON.stringify(settings.values.printer)};window.renderInvoice();`;
                setTimeout(() => {
                    printWindow.document.body.appendChild(script);
                    printWindow.document.close(); // necessary for IE >= 10
                    printWindow.focus(); // necessary for IE >= 10*/
                    printWindow.print();
                    printWindow.close();
                }, 600)
                return true;
            }
            Print();
        }
    }

    return {
        print
    }
}
export default usePrinter;