import Style from './style.module.scss';
import { useState } from 'react';
import ButtonAsync from '../../../../ButtonAsync';
import useMenuContext from '../../../../../hook/useMenuContext';

import { NotificationManager } from 'react-notifications';

const CreateNewMenuModal = () => {

    const MenuContext = useMenuContext();
    const [menuName, setMenuName] = useState('');
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(true);

    async function handleSubmit(e) {
        e.preventDefault();
        if (menuName.trim().length > 0) {
            setSubmitButtonEnabled(false)
            try {
                const result = await MenuContext.createMenu(menuName);
                if (result) {
                    NotificationManager.success(`Um novo cardápio com o nome de ${result.name} foi cadastrado com sucesso.`)
                } else
                    NotificationManager.error('Houve um erro ao tentar cadastrar um novo cardápio. (result is null)')
            } catch (error) {
                NotificationManager.error(`Houve um erro ao tentar cadastrar um novo cardápio. (${error})`)
            }
            setSubmitButtonEnabled(true)
        } else {
            NotificationManager.error(`Você precisa usar um nome válido para cadastrar o cardápio`)
        }
    }


    return (
        <form onSubmit={handleSubmit} className={Style.container}>
            <input onChange={(e) => setMenuName(e.target.value)} type='text' placeholder='Nome do cardápio' required={true} value={menuName} />
            <ButtonAsync enabled={submitButtonEnabled} loadingChildren={'Criando cardápio..'} >Criar</ButtonAsync>
        </form>
    )
}

export default CreateNewMenuModal