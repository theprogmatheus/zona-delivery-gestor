import Style from './style.module.scss';
import useCurrency from '../../../hook/useCurrency';
import useMenuContext from '../../../hook/useMenuContext';
import { NotificationManager } from 'react-notifications';
import useAppContext from '../../../hook/useAppContext';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { useEffect } from 'react';

const MenuGroupAditional = ({ aditionalGroup, aditionalId }) => {

    //toggleAditionalPause

    const MenuContext = useMenuContext();
    const { modal } = useAppContext();
    const [aditional, setAditional] = useState();


    useEffect(() => { MenuContext.getMenuAditional(aditionalId).then(setAditional) }, [])


    const { formatCurrency } = useCurrency();

    function handleRemove() {
        modal.showConfirm(<h3>Tem certeza de que deseja remover o adicional '{aditional.name}'?</h3>,
            <center>
                <p>
                    Ao confirmar, você irá remover este adicional do grupo de adicionais.<br />
                    <b>Tem certeza de que deseja fazer isso?</b>
                </p>
            </center>,
            (confirmed) => {
                if (confirmed) {
                    MenuContext.removeAditionalFromGroup(aditional.id, aditionalGroup.id).then((result) => {
                        if (result)
                            NotificationManager.success(`Adicional ${aditional.name} removido com sucesso!`)
                    })
                }
            })
    }

    return (aditional &&
        <div className={Style.container}>
            <div className={Style.preview}>

                <div className={Style.picture}>
                    {aditional.image && (<img src={aditional.image} alt={`Preview de ${aditional.name}`} />)}
                </div>

                <div className={Style.description}>
                    <h3>{aditional.name}</h3>
                    {aditional.description && <p>{aditional.description}</p>}
                </div>
                <div className={Style.price}>
                    {aditional?.oldPrice > 0 && <p className={Style.oldPrice}>{formatCurrency(aditional.oldPrice)}</p>}
                    <p>{formatCurrency(aditional.price)}</p>
                </div>

                <div className={Style.buttons}>
                    <button onClick={handleRemove}><AiOutlineClose /></button>
                </div>

            </div>

        </div>
    )
}

export default MenuGroupAditional