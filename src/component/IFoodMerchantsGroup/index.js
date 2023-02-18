import Style from './style.module.scss';

import IFoodMerchantStatus from '../IFoodMerchantStatus';
import useAppContext from '../../hook/useAppContext';

const IFoodMerchantsGroup = ({ ifoodMerchants }) => {

    const { modal } = useAppContext();

    function handleClick() {
        modal.showWindow(<h3>Status das lojas IFood</h3>,
            <ul className={Style.list}>
                {ifoodMerchants && ifoodMerchants.map((ifoodMerchant, index) => <li><IFoodMerchantStatus ifoodMerchant={ifoodMerchant} key={index} /></li>)}
            </ul>
        );
    }


    return (ifoodMerchants &&
        <div className={Style.container} onClick={handleClick}>
            <p>
                LOJAS IFOOD:
            </p>
            <p>{ifoodMerchants?.filter((merchant) => merchant?.status[0]?.state === 'OK' || merchant?.status[0]?.state === 'WARNING').length}/{ifoodMerchants.length}</p>
        </div>
    )
}

export default IFoodMerchantsGroup