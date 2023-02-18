import Style from './style.module.scss';

import StatusModal from './StatusModal';

import useAppContext from './../../hook/useAppContext';

import { BsFillCheckCircleFill, BsFillExclamationCircleFill } from 'react-icons/bs';
import { IoCloudOffline } from 'react-icons/io5';

const IFoodMerchantStatus = ({ ifoodMerchant }) => {


    const { modal } = useAppContext();


    // states: OK, WARNING, CLOSED, ERROR


    function handleClick() {
        modal.showWindow(<h3>Status de {ifoodMerchant.merchantName}</h3>, ifoodMerchant?.status?.map((status, index) => <StatusModal ifoodMerchant={ifoodMerchant} status={status} key={index} />))
    }


    function getStateIcon(status) {
        switch (status.state) {
            case "OK":
            case "WARNING":
                return <BsFillCheckCircleFill />;
            case "CLOSED":
                return <IoCloudOffline />;
            case "ERROR":
                return <BsFillExclamationCircleFill />;

            default: return <></>
        }
    }


    function getStateClass(status) {
        switch (status.state) {
            case "OK":
                return Style.ok;
            case "WARNING":
                return Style.warning;
            case "CLOSED":
                return Style.closed;
            case "ERROR":
                return Style.error;

            default: return ''
        }
    }

    return (ifoodMerchant?.status && ifoodMerchant.status.map((status, index) => (
        <div key={index} className={Style.container} onClick={handleClick}>
            <div className={`${Style.title} ${getStateClass(status)}`}>
                {getStateIcon(status)}
                <div>
                    {status.message.title}
                    <p className={Style.subtitle}>
                        {ifoodMerchant.merchantName}
                    </p>
                    {status.message.subtitle && (
                        <>
                            <p className={Style.subtitle}>
                                {status.message.subtitle}
                            </p>
                        </>
                    )}
                </div>
            </div>

            {status.message.description && (
                <div className={Style.description}>
                    {status.message.description}
                </div>
            )}
        </div>
    )))
}

export default IFoodMerchantStatus