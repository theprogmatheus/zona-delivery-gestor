import Style from './style.module.scss';
import { useState } from 'react';
import ButtonAsync from '../ButtonAsync';
import useMenuContext from '../../hook/useMenuContext';

const AditionalsToAddGroup = ({ menu, group }) => {

    const MenuContext = useMenuContext();

    const [running, setRunning] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');



    async function handleSubmit(e) {
        e.preventDefault();
        setRunning(true)
        if (selectedItem)
            MenuContext.addAditionalToGroup(selectedItem.id, group.id);
        setRunning(false)
    }




    return (
        <form className={Style.container} onSubmit={handleSubmit}>

            <ul className={Style.items}>
                {menu?.aditionals?.filter((aditional) => !group?.aditionals?.includes(aditional.id)).map((aditional) => (
                    <li key={aditional.id} >
                        <label className={Style.item}>
                            <span>{aditional.name}</span>
                            <input type='radio' name='item' onChange={() => setSelectedItem(aditional)} required={true} />
                        </label>
                    </li>
                ))}

            </ul>
            <ButtonAsync enabled={!running} loadingChildren='Aguarde..'>Adicionar</ButtonAsync>
        </form>
    )
}

export default AditionalsToAddGroup