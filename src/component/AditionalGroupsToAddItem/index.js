import Style from './style.module.scss';

import { useState } from 'react';

import ButtonAsync from '../ButtonAsync';

import useMenuContext from '../../hook/useMenuContext';

const AditionalGroupsToAddItem = ({ menu, item }) => {

    const MenuContext = useMenuContext();

    const [running, setRunning] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setRunning(true)
        if (selectedItem)
            MenuContext.addAditionalGroupToItem(selectedItem.id, item.id);
        setRunning(false)
    }

    return (
        <form className={Style.container} onSubmit={handleSubmit}>

            <ul className={Style.items}>
                {menu?.aditionalGroups?.filter((aditionalGroup) => !item?.aditionalGroups?.includes(aditionalGroup.id)).map((aditionalGroup) => (
                    <li key={aditionalGroup.id} >
                        <label className={Style.item}>
                            <span>{aditionalGroup.name}</span>
                            <input type='radio' name='item' onChange={() => setSelectedItem(aditionalGroup)} required={true} />
                        </label>
                    </li>
                ))}

            </ul>
            <ButtonAsync enabled={!running} loadingChildren='Aguarde..'>Adicionar Item</ButtonAsync>
        </form>
    )
}

export default AditionalGroupsToAddItem