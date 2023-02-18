import Style from './style.module.scss';
import { useState } from 'react';
import ButtonAsync from '../../../../ButtonAsync';
import useMenuContext from '../../../../../hook/useMenuContext';

import { NotificationManager } from 'react-notifications';

const CreateNewMenuAditionalModal = ({ menu }) => {

    const MenuContext = useMenuContext();
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(true);


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        setSubmitButtonEnabled(false);
        try {
            const result = await MenuContext.createAditional(menu.id, name, description, price, minAmount, maxAmount);

            if (result)
                NotificationManager.success(`Adicional cadastrado com sucesso`)
            else
                NotificationManager.error(`Houve um erro ao tentar criar um adicional: result is null`)


        } catch (error) {
            NotificationManager.error(`Houve um erro ao tentar criar um adicional: ${error}`)
        }
        setSubmitButtonEnabled(true);
    }

    return (
        <form onSubmit={handleSubmit} className={Style.container}>
            <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Nome' required={true} value={name} />
            <input onChange={(e) => setDescription(e.target.value)} type='text' placeholder='Descrição' required={true} value={description} />
            <input onChange={(e) => setPrice(e.target.value)} type='number' placeholder='Preço' required={true} value={price} min={0} />
            <input onChange={(e) => setMinAmount(e.target.value)} type='number' placeholder='Quantidade mínima por item' required={true} value={minAmount} min={0} />
            <input onChange={(e) => setMaxAmount(e.target.value)} type='number' placeholder='Quantidade máxima por item' required={true} value={maxAmount} min={0} />
            <ButtonAsync enabled={submitButtonEnabled} loadingChildren={'Aguarde..'} >Criar</ButtonAsync>
        </form>
    )
}

export default CreateNewMenuAditionalModal