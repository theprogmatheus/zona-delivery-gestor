import Style from './style.module.scss';
import MenuItemAditionalGroup from './../MenuItemAditionalGroup';
import { useState } from 'react';
import useCurrency from './../../../hook/useCurrency';
import useAppContext from './../../../hook/useAppContext';
import { NotificationManager } from 'react-notifications';
import useMenuContext from './../../../hook/useMenuContext';
import AditionalGroupsToAddItem from './../../AditionalGroupsToAddItem';

import { BsFillPauseFill, BsFillPlayFill, BsFillCaretDownFill, BsFillCaretUpFill, BsFillTrashFill, BsPlusLg } from 'react-icons/bs';

const MenuItem = ({ menu, item }) => {


    const MenuContext = useMenuContext();
    const { modal } = useAppContext();

    const [showMore, setShowMore] = useState(false);
    const { formatCurrency } = useCurrency();

    function handleDeleteItem() {
        modal.showConfirm(<h3>Tem certeza de que deseja deletar o item '{item.name}'?</h3>,
            <center>
                <p>
                    Ao confirmar, você irá deletar este item <b>permanentemente</b>.<br />
                    Esse processo é <b>IRREVERSÍVEL</b>! <br /><br /> <b>tem certeza de que deseja fazer isso?</b>
                </p>
            </center>,
            (confirmed) => {
                if (confirmed)
                    MenuContext.deleteItem(item.id).then((result) => {
                        if (result)
                            NotificationManager.success(`Item ${item.name} deletado com sucesso!`)
                    })
            })
    }

    function handleAddAditionalGroup() {
        modal.showWindow(<h3>Adicionar grupo de adicionais no item {item.name}</h3>, (
            <AditionalGroupsToAddItem menu={menu} item={item} />
        ))
    }

    function handleTogglePause() {
        if (item?.id)
            MenuContext.toggleMenuItemPause(item.id)
    }

    return (item &&
        <div className={Style.container}>
            {console.log(item)}

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
                    <button onClick={handleTogglePause}>{item.paused ? <BsFillPlayFill /> : <BsFillPauseFill />}</button>
                    <button onClick={handleAddAditionalGroup}><BsPlusLg /></button>
                    <button onClick={handleDeleteItem}><BsFillTrashFill /></button>
                </div>

            </div>

            {item.aditionalGroups?.length > 0 &&
                <div className={Style.aditionals}>
                    {item.aditionalGroups?.map((aditionalGroupId) => <MenuItemAditionalGroup key={aditionalGroupId} item={item} aditionalGroupId={aditionalGroupId} />)}
                </div>
            }


        </div>
    )
}

export default MenuItem