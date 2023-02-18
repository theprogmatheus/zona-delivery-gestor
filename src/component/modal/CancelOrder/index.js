import Style from './style.module.scss';
import { useState } from 'react';
import useAppContext from '../../../hook/useAppContext';

const CancelOrder = ({ order, reasons, onCancel = () => { } }) => {
    const [activeReason, setActiveReason] = useState();
    const { api } = useAppContext();

    function handleSubmit(e) {
        e.preventDefault();
        const reason = JSON.parse(activeReason);

        api.requests.ifoodRequestCancellation(order.restaurant.id, order.id, reason.description, reason.cancelCodeId).then(() => {
            onCancel();
        })

    }

    return (
        <form className={Style.container} onSubmit={handleSubmit} onChange={(e) => setActiveReason(e.target.value)}>
            {reasons.map((reason, index) => (
                <label key={index} className={activeReason === reason.cancelCodeId ? Style.active : ''}>
                    <input
                        type='radio'
                        name='reason'
                        value={JSON.stringify(reason)}
                    />
                    <span>{reason.description}</span>
                </label>
            ))}
            {activeReason && <button>Solicitar cancelamento</button>}
        </form>
    )
}

export default CancelOrder