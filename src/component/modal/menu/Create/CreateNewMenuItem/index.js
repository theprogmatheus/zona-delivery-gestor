import Style from './style.module.scss';

import { useState } from 'react';
import ButtonAsync from '../../../../ButtonAsync';

import { NotificationManager } from 'react-notifications';
import useMenuContext from '../../../../../hook/useMenuContext';

const CreateNewMenuItemModal = ({ menu }) => {

    const MenuContext = useMenuContext();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');


    const [creating, setCreating] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();

        setCreating(true);

        await MenuContext.createItem(menu.id, name, description, price, '');

        NotificationManager.success(`Item cadastrado com sucesso`)


        setCreating(false);
    }


    return (
        <form className={Style.container} onSubmit={handleSubmit}>
            <input placeholder='Nome' type='text' value={name} onChange={(e) => setName(e.target.value)} required={true} />
            <input placeholder='Descrição' type='text' value={description} onChange={(e) => setDescription(e.target.value)} required={true} />
            <input placeholder='Preço' type='decimal' value={price} onChange={(e) => setPrice(e.target.value)} min={0} required={true} />
            <ButtonAsync enabled={!creating} loadingChildren={'Aguarde..'} >Criar</ButtonAsync>
        </form>
    )
}

export default CreateNewMenuItemModal