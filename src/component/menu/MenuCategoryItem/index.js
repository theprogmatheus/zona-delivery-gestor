import Style from './style.module.scss';
import MenuAditional from '../MenuAditional';
import { useState, useEffect } from 'react';
import useCurrency from '../../../hook/useCurrency';
import useAppContext from '../../../hook/useAppContext';
import { NotificationManager } from 'react-notifications';
import useMenuContext from '../../../hook/useMenuContext';

import { AiOutlineClose } from 'react-icons/ai';
import {BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';

const MenuCategoryItem = ({ menu, category, itemId }) => {


    const MenuContext = useMenuContext();
    const { modal } = useAppContext();

    const [showMore, setShowMore] = useState(false);
    const { formatCurrency } = useCurrency();
    const [item, setItem] = useState();


    useEffect(() => { MenuContext.getMenuItem(itemId).then(setItem) }, [])





    function handleRemoveItem() {
        modal.showConfirm(<h3>Tem certeza de que deseja remover o item '{item.name}'?</h3>,
            <center>
                <p>
                    Ao confirmar, você irá remover este item da categoria {category.name}.<br />
                    <b>Tem certeza de que deseja fazer isso?</b>
                </p>
            </center>,
            (confirmed) => {
                if (confirmed)
                    MenuContext.removeMenuItemFromCategory(item.id, category.id).then((result) => {
                        if (result)
                            NotificationManager.success(`Item ${item.name} removido com sucesso!`)
                    })
            })
    }

    return (item &&
        <div className={Style.container}>
            <div className={Style.preview}>

                <div className={Style.picture}>
                    {item.image && (<img src={item.image} alt={`Preview de ${item.name}`} />)}
                </div>

                <div className={Style.description}>
                    <h3>{item.name}</h3>
                    {item.description && <p>{item.description}</p>}
                </div>
                <div className={Style.price}>
                    {item?.oldPrice > 0 && <p className={Style.oldPrice}>{formatCurrency(item.oldPrice)}</p>}
                    <p>{formatCurrency(item.price)}</p>
                </div>

                <div className={Style.buttons}>
                    <button onClick={handleRemoveItem}><AiOutlineClose /></button>
                    {item.aditionals?.length > 0 && <button onClick={() => setShowMore(!showMore)}>{showMore ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</button>}
                </div>

                {/*
                <div className={Style.titleBar}>
                    <h3>{item.name}</h3>
                    <div className={Style.buttons}>
                        <button><BsFillPauseFill /></button>
                        <button><BsFillPencilFill /></button>
                    </div>
                </div>
                <div className={Style.body}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <div>
                        <h3>Adicionais: </h3>
                        {item.aditionals?.map((aditional) => <MenuAditional key={aditional.id} aditional={aditional} />)}
                    </div>
                </div>
            */}

            </div>

            {showMore && (
                <div className={Style.aditionals}>
                    {item.aditionals?.map((aditional) => <MenuAditional key={aditional.id} aditional={aditional} />)}
                </div>
            )}

        </div>
    )
}

export default MenuCategoryItem