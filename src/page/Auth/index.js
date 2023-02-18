import Style from './style.module.scss';

import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import useAppContext from './../../hook/useAppContext';
import ButtonAsync from './../../component/ButtonAsync';


const AuthPage = () => {

    const { api, setAuthenticated } = useAppContext();


    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    }

    const handleLogin = async () => {
        setLoading(true)
        const result = await api.authenticate({
            email,
            password
        });

        if (result) {
            NotificationManager.success('Usuário validado e autenticado com sucesso.', 'Autenticado com sucesso')
            setAuthenticated(true);
        } else {
            NotificationManager.error('O nome de usuário ou senha estão incorretos, confira e tente novamente.', 'Falha ao tentar se autenticar')
        }

        setLoading(false)
    }

    return (
        <div className={Style.container}>
            <form className={Style.form} onSubmit={handleSubmit}>

                <h1 className={Style.title}>Gestor de Pedidos</h1>

                <input
                    className={Style.input}
                    type="email"
                    placeholder='E-Mail'
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <input
                    className={Style.input}
                    type="password"
                    placeholder='Senha'
                    autoComplete='off'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <ButtonAsync className={`${Style.input} ${Style.submit}`} enabled={!loading} loadingChildren={'Aguarde..'}>Entrar</ButtonAsync>
            </form>
        </div>
    )
}

export default AuthPage