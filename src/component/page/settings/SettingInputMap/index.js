import { useState } from 'react';
import Style from './style.module.scss';

const SettingInputMap = ({ setting, value, onChange }) => {

    const [data, setData] = useState(value && Object.keys(value).length > 0 ? Object.keys(value).map((key) => {
        return {
            mapKey: key,
            mapValue: value[key]
        }
    }) : [{ mapKey: '', mapValue: '' }]);


    const handleAdd = (event) => {
        event.preventDefault();
        setData((prev) => {
            prev[prev.length] = {
                mapKey: '',
                mapValue: ''
            }
            handleChange(prev)
            return [...prev]
        })
    }

    const handleRemove = (event, index) => {
        event.preventDefault();
        setData((prev) => {
            prev.splice(index, 1)
            handleChange(prev)
            return [...prev]
        })
    }

    const handleChangeKey = (newKey, index) => {
        setData((prev) => {
            prev[index].mapKey = newKey;
            handleChange(prev)
            return [...prev]
        })
    }

    const handleChangeValue = (newValue, index) => {
        setData((prev) => {
            prev[index].mapValue = newValue;
            handleChange(prev)
            return [...prev]
        })
    }

    const handleChange = (changedValue) => {
        if (changedValue && onChange) {
            let map = {};
            changedValue.forEach((mapItem) => map[mapItem.mapKey] = mapItem.mapValue)
            setTimeout(() => onChange(map), 0)
        }
    }

    return (
        <div className={Style.container}>

            <div className={Style.inputGroup}>
                <h3 style={{ width: "30%", textAlign: "center" }}>{setting.labelKey ? setting.labelKey : "Chave"}</h3>
                <h3 style={{ width: "70%", textAlign: "center" }}>{setting.labelValue ? setting.labelValue : "Valor"}</h3>
            </div>

            {
                data?.map((mapObject, index) => {
                    return (
                        <div key={`${data.length}-${index}`} className={Style.inputGroup}>
                            <textarea className={Style.inputKey} value={mapObject.mapKey} onChange={(e) => handleChangeKey(e.target.value, index)} placeholder={setting.labelKey ? setting.labelKey : "Chave"}></textarea>
                            <textarea className={Style.inputValue} value={mapObject.mapValue} onChange={(e) => handleChangeValue(e.target.value, index)} placeholder={setting.labelValue ? setting.labelValue : "Valor"} ></textarea>
                            <button className={Style.removeButton} onClick={(event) => handleRemove(event, index)}>X</button>
                        </div>
                    )
                })
            }
            <button className={Style.addButton} onClick={handleAdd}>+</button>
        </div>
    )
}

export default SettingInputMap