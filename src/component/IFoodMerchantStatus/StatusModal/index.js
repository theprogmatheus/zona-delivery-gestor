import Style from './style.module.scss';

import { BsFillCheckCircleFill, BsFillExclamationCircleFill } from 'react-icons/bs';
import { IoCloudOffline } from 'react-icons/io5';

const StatusModal = ({ ifoodMerchant, status }) => {



    function getStateIcon(validation) {
        switch (validation.state) {
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


    function getStateClass(validation) {
        switch (validation.state) {
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

    function validationJSX(validation, index) {
        return (
            <li className={`${Style.validation} ${getStateClass(validation)}`} key={index}>
                {getStateIcon(validation)}
                <div>
                    <p>{validation.message.title}</p>
                    {validation.message.subtitle && (
                        <p className={Style.subtitle}>
                            {validation.message.subtitle}
                        </p>
                    )}
                    {validation.message.description && (
                        <p className={Style.subtitle}>
                            Motivo: {validation.message.description}
                        </p>
                    )}
                </div>
            </li>
        )
    }

    return (
        <div className={Style.container}>
            {status?.validations?.map((validation, index) => validationJSX(validation, index))}
        </div>
    )
}

export default StatusModal