import Style from './style.module.scss';
import useCurrency from './../../../hook/useCurrency';
import useMenuContext from './../../../hook/useMenuContext';
import { NotificationManager } from 'react-notifications';
import useAppContext from './../../../hook/useAppContext';
import { BsFillPlayFill, BsFillPauseFill, BsFillTrashFill } from 'react-icons/bs';

const MenuAditional = ({ aditional }) => {

    //toggleAditionalPause

    const MenuContext = useMenuContext();
    const { modal } = useAppContext();


    const { formatCurrency } = useCurrency();

    function handleDeleteAditional() {
        modal.showConfirm(<h3>Tem certeza de que deseja deletar o adicional '{aditional.name}'?</h3>,
            <center>
                <p>
                    Ao confirmar, você irá deletar este adicional <b>permanentemente</b>.<br />
                    Esse processo é <b>IRREVERSÍVEL</b>! <br /><br /> <b>tem certeza de que deseja fazer isso?</b>
                </p>
            </center>,
            (confirmed) => {
                if (confirmed)
                    MenuContext.deleteAditional(aditional.id).then((result) => {
                        if (result)
                            NotificationManager.success(`Adicional ${aditional.name} deletado com sucesso!`)
                    })
            })
    }
    function handlePauseAditional() {
        if (aditional?.id)
            MenuContext.toggleAditionalPause(aditional.id);

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
                    <button onClick={handlePauseAditional}>{aditional.paused ? <BsFillPlayFill /> : <BsFillPauseFill />}</button>
                    <button onClick={handleDeleteAditional}><BsFillTrashFill /></button>
                </div>

            </div>

        </div>
    )
}

export default MenuAditional