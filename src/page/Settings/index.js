import Style from './style.module.scss';
import SettingInput from '../../component/page/settings/SettingInput';

import { NotificationManager } from 'react-notifications';

import { useState, useEffect } from 'react';
import useLoadingScreen from '../../hook/useLoadingScreen';
import useAppContext from '../../hook/useAppContext';

const SettingsPage = () => {

    const [activeSetting, setActiveSetting] = useState('');
    const [showSaveButton, setShowSaveButton] = useState(false);
    const { JSX } = useLoadingScreen(true, false);
    const [values, setValues] = useState();
    const { api, settings, modal } = useAppContext();


    useEffect(() => {

        if (settings?.settings && activeSetting === '') {
            const settingsKeys = Object.keys(settings?.settings);
            if (settingsKeys.length > 0)
                setActiveSetting(settingsKeys[0])
        }
        setValues(settings.values);

        // eslint-disable-next-line
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();

        settings.values = values;
        settings.save();

        NotificationManager.success('As configurações foram alteradas com sucesso, talvez seja necessário reiniciar a aplicação.', 'Configurações alteradas!');
        setShowSaveButton(false)

        // console.log(values)
    }

    function handleLogout() {
        modal.showConfirm(<h3>Sair?</h3>, <p>Ao sair você terá que fazer login novamente com sua conta, tem certeza de que deseja fazer isso?</p>, (confirmed) => {
            if (confirmed)
                api.logout()
        })
    }

    return (
        <div className={Style.container}>
            {settings?.settings && values ? (
                <>
                    <ul className={Style.categories}>

                        {Object.keys(settings.settings).map((key, index) => {
                            const value = settings.settings[key];

                            return (
                                <li key={`${key}.${index}`} className={Style.category}>
                                    <button
                                        className={`${Style.button} ${key.toLocaleLowerCase() === activeSetting.toLocaleLowerCase() ? Style.active : ''}`}
                                        onClick={() => { setActiveSetting(key) }}
                                    >{value.label}</button>
                                </li>
                            )

                        })}

                        <li className={Style.category}>
                            <button className={Style.button} onClick={handleLogout}>Sair</button>
                        </li>
                    </ul>

                    <div className={Style.content}>
                        {activeSetting && settings?.settings[activeSetting] && (
                            <form className={Style.form} onSubmit={handleSubmit}>
                                <h3 className={Style.title}>{settings.settings[activeSetting].title}</h3>
                                {settings.settings[activeSetting].values && Object.keys(settings.settings[activeSetting].values).map((key, index) => (
                                    <label key={`${activeSetting}.${key}.${index}`}>
                                        <span className={Style.label}>{settings.settings[activeSetting].values[key].label || key}</span>
                                        <SettingInput
                                            className={Style.input}
                                            setting={settings.settings[activeSetting].values[key]}
                                            value={values[activeSetting] ? values[activeSetting][key] : ''}
                                            onChange={(changedValues) => {
                                                setValues((prev) => {
                                                    if (!prev[activeSetting])
                                                        prev[activeSetting] = {};
                                                    prev[activeSetting][key] = changedValues;
                                                    return { ...prev }
                                                })
                                                setShowSaveButton(true)
                                            }}

                                        />
                                    </label>
                                ))}
                                {showSaveButton && (
                                    <div className={Style.footBar}>
                                        <button className={`${Style.button} ${Style.submit}`}>Salvar Alterações</button>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </>
            ) : JSX
            }
        </div >
    )
}

export default SettingsPage