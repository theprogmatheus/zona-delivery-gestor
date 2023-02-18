import Style from './style.module.scss';

import { useState } from 'react';

import SettingInput from '../SettingInput';

const SettingInputCollection = ({ setting, value, onChange }) => {

    const [data, setData] = useState(value?.length > 0 ? value : ['']);

    const handleAdd = (event) => {
        event.preventDefault();
        setData((prev) => {
            prev[prev.length] = '';

            if (onChange)
                setTimeout(() => onChange(prev), 0)


            return [...prev]
        })
    }

    const handleRemove = (event, index) => {
        event.preventDefault();
        setData((prev) => {
            prev.splice(index, 1)

            if (onChange)
                setTimeout(() => onChange(prev), 0)

            return [...prev];
        })

    }

    const handleChange = (newValue, index) => {

        setData((prev) => {
            prev[index] = newValue;

            if (onChange)
                setTimeout(() => onChange(prev), 0)

            return [
                ...prev
            ]
        })

    }

    return (
        <div className={Style.container}>
            {
                data?.map((value, index) => {
                    return (
                        <div className={Style.inputGroup} key={`${data.length}-${index}`}>
                            <SettingInput setting={{ type: setting.ofType }} className={Style.input} value={value} onChange={(newValue) => handleChange(newValue, index)} />
                            <button className={Style.removeButton} onClick={(event) => handleRemove(event, index)}>X</button>
                        </div>
                    )
                })
            }
            <button className={Style.addButton} onClick={handleAdd}>+</button>
        </div>
    )
}

export default SettingInputCollection