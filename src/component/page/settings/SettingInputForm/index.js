import { useState } from 'react';
import Style from './style.module.scss';

const SettingInputForm = ({ setting, value, onChange }) => {

    const [data, setData] = useState(value);

    const handleChange = (newValue, key) => {

        setData((prev) => {

            if (!prev) prev = {};

            prev[key] = newValue;

            if (onChange)
                setTimeout(() => onChange(prev), 0);

            return { ...prev }
        })
    }

    return (
        <div className={Style.container}>
            {
                Object.keys(setting?.value).map((settingKey, index) => {
                    return (
                        <div key={index} className={Style.inputGroup}>
                            <input className={Style.inputKey} type="text" value={setting.value[settingKey].label} onChange={() => { }} disabled />
                            <textarea className={Style.inputValue} type="text" value={(data && data[settingKey]) ? data[settingKey] : ''} onChange={(e) => handleChange(e.target.value, settingKey)}></textarea>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SettingInputForm