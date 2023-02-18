import Style from './style.module.scss';

import { useState } from 'react';

import ButtonAsync from './../ButtonAsync';

import useMenuContext from './../../hook/useMenuContext';




const ItemsToAddList = ({ menu, category }) => {

    const MenuContext = useMenuContext();

    const [running, setRunning] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');



    async function handleSubmit(e) {
        e.preventDefault();
        setRunning(true)
        if (selectedItem)
            MenuContext.addMenuItemToCategory(selectedItem.id, category.id);
        setRunning(false)
    }




    return (
        <form className={Style.container} onSubmit={handleSubmit}>

            <ul className={Style.items}>
                {menu?.items?.filter((item) => !category?.items?.includes(item.id)).map((item) => (
                    <li key={item.id} >
                        <label className={Style.item}>
                            <span>{item.name}</span>
                            <input type='radio' name='item' onChange={() => setSelectedItem(item)} required={true} />
                        </label>
                    </li>
                ))}

            </ul>
            <ButtonAsync enabled={!running} loadingChildren='Aguarde..'>Adicionar Item</ButtonAsync>
        </form>
    )
}

export default ItemsToAddList