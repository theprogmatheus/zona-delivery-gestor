import Style from './style.module.scss';
import { useState } from 'react';
import ButtonAsync from '../../../../ButtonAsync';
import useMenuContext from '../../../../../hook/useMenuContext';

import { NotificationManager } from 'react-notifications';

const CreateNewMenuCategoryModal = ({ menu }) => {
    const MenuContext = useMenuContext();
    const [name, setName] = useState('');
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(true);

    async function handleSubmit(e) {
        e.preventDefault();
        if (name.trim().length > 0) {
            setSubmitButtonEnabled(false)
            try {
                const result = await MenuContext.createCategory(menu.id, name)
                if (result) {
                    NotificationManager.success(`Uma nova categoria com o nome de ${result.name} foi cadastrado no cardápio ${menu.name} com sucesso.`)
                    MenuContext.refresh()
                } else
                    NotificationManager.error('Houve um erro ao tentar cadastrar uma nova categoria. (result is null)')
            } catch (error) {
                NotificationManager.error(`Houve um erro ao tentar cadastrar uma nova categoria. (${error})`)
            }
            setSubmitButtonEnabled(true)
        } else {
            NotificationManager.error(`Você precisa usar um nome válido para cadastrar uma nova categoria`)
        }
    }


    return (
        <form onSubmit={handleSubmit} className={Style.container}>
            <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Nome da categoria' required={true} value={name} />
            <ButtonAsync enabled={submitButtonEnabled} loadingChildren={'Criando categoria..'} >Criar</ButtonAsync>
        </form>
    )
}

export default CreateNewMenuCategoryModal