import Style from './style.module.scss';
import MenuGroupAditional from '../MenuGroupAditional';

import { AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import useMenuContext from '../../../hook/useMenuContext';
import useAppContext from '../../../hook/useAppContext';
import { NotificationManager } from 'react-notifications';

const MenuItemAditionalGroup = ({ item, aditionalGroupId }) => {

    const MenuContext = useMenuContext();
    const [aditionalGroup, setAditionalGroup] = useState();
    const { modal } = useAppContext();

    useEffect(() => { MenuContext.getMenuAditionalGroup(aditionalGroupId).then(setAditionalGroup) }, [])


    function handleRemove() {
        modal.showConfirm(<h3>Tem certeza de que deseja remover o grupo de adicionais '{aditionalGroup.name}'?</h3>,
            <center>
                <p>
                    Ao confirmar, você irá remover este grupo de adicionais do item.<br />
                    <b>Tem certeza de que deseja fazer isso?</b>
                </p>
            </center>,
            (confirmed) => {
                if (confirmed) {
                    MenuContext.removeAditionalGroupFromItem(aditionalGroup.id, item.id).then((result) => {
                        if (result)
                            NotificationManager.success(`Grupo de adicionais ${aditionalGroup.name} removido com sucesso!`)
                    })
                }
            })
    }


    return (aditionalGroup &&
        <div className={Style.container}>

            <div className={Style.titleBar}>
                <h3>{aditionalGroup.name} (Min: {aditionalGroup.min} Max: {aditionalGroup.max})</h3>
                <div className={Style.buttons}>
                    <button onClick={handleRemove}><AiOutlineClose /></button>
                </div>
            </div>
        </div>
    )
}

export default MenuItemAditionalGroup