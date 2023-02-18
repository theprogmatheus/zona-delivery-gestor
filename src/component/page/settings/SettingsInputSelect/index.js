import Style from './style.module.scss';

const SettingsInputSelect = ({ setting, value = "", onChange = () => { } }) => {
    return (
        <select className={Style.container} value={value} onChange={(e) => onChange(e.target.value)}>
            {setting?.options?.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}

export default SettingsInputSelect