import Style from './style.module.scss';
import { useState } from 'react';
import ButtonAsync from '../../../../ButtonAsync';
import useMenuContext from '../../../../../hook/useMenuContext';

import { NotificationManager } from 'react-notifications';

const CreateNewMenuAditionalGroup = ({ menu }) => {

    const MenuContext = useMenuContext();
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(true);


    const [name, setName] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        setSubmitButtonEnabled(false);
        try {
            const result = await MenuContext.createAditionalGroup(menu.id, name, minAmount, maxAmount);

            if (result)
                NotificationManager.success(`Grupo de adicionais cadastrado com sucesso`)
            else
                NotificationManager.error(`Houve um erro ao tentar criar um grupo de adicionais: result is null`)


        } catch (error) {
            NotificationManager.error(`Houve um erro ao tentar criar um grupo de adicionais: ${error}`)
        }
        setSubmitButtonEnabled(true);
    }

    return (
        <form onSubmit={handleSubmit} className={Style.container}>
            <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Nome' required={true} value={name} />
            <input onChange={(e) => setMinAmount(e.target.value)} type='number' placeholder='Mínimo que o cliente pode pegar de adicional' required={true} value={minAmount} min={0} />
            <input onChange={(e) => setMaxAmount(e.target.value)} type='number' placeholder='Máximo que o cliente pode pegar de adicional' required={true} value={maxAmount} min={0} />
            <ButtonAsync enabled={submitButtonEnabled} loadingChildren={'Aguarde..'} >Criar</ButtonAsync>
        </form>
    )
}

export default CreateNewMenuAditionalGroup