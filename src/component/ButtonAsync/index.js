import { useState, useEffect } from "react";

const ButtonAsync = ({
    children,
    loadingChildren,
    style = {},
    enabled = true,
    action = async () => { },
    ...props }) => {

    const [disabled, setDisabled] = useState(!enabled);

    useEffect(() => setDisabled(!enabled), [enabled])

    async function handleClick(e) {
        setDisabled(true);
        await action(e);
        setDisabled(false);
    }
    return (
        <button
            style={disabled ? { pointerEvents: 'none', opacity: '.75', userSelect: 'none', ...style } : { ...style }}
            onClick={handleClick}
            {...props}
        >
            {disabled ? (loadingChildren || children) : children}
        </button>
    )
}

export default ButtonAsync