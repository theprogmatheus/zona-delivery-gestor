import Style from './style.module.scss';

import { useState } from 'react';

import SettingInputCollection from '../SettingInputCollection';
import SettingInputMap from '../SettingInputMap';
import SettingInputForm from '../SettingInputForm';
import SettingsInputSelect from '../SettingsInputSelect';

const SettingInput = ({ setting, value, onChange, className = '' }) => {

    // tipo, valor inical, onChange, 

    const [data, setData] = useState(value);

    const handleChange = (value) => {
        setData(value)

        if (onChange)
            setTimeout(() =>
                onChange(value), 0);
    }



    const createInput = () => {

        switch (setting?.type?.toLowerCase()) {

            case "string":
                return <input className={`${Style.input} ${Style.string} ${className}`} type="text" value={data} onChange={(e) => handleChange(e.target.value)} />

            case "text":
                return <textarea className={`${Style.input} ${Style.text} ${className}`} value={data} onChange={(e) => handleChange(e.target.value)}></textarea>

            case "decimal":
            case "number":
                return <input className={`${Style.input} ${Style.number} ${className}`} type="number" value={data} onChange={(e) => handleChange(e.target.value)} />

            case "boolean":
                return <input className={`${Style.input} ${Style.boolean} ${className}`} type="checkbox" checked={data || false} onChange={(e) => handleChange(e.target.checked)} />

            case "collection":
                return <SettingInputCollection setting={setting} value={value} onChange={(changedValues) => handleChange(changedValues)} />

            case "map":
                return <SettingInputMap setting={setting} value={value} onChange={onChange} />

            case "form":
                return <SettingInputForm setting={setting} value={value} onChange={onChange} />
            case "select":
                return <SettingsInputSelect setting={setting} value={value} onChange={onChange} />
            default:
                return <><p>Configuração não suportada pelo sistema.</p><br /></>
        }
    }



    return (createInput())
}

export default SettingInput