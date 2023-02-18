import { useState, useCallback } from 'react';

const useStorage = (key) => {

    const [state, setState] = useState((item = localStorage.getItem(key)) => item && JSON.parse(item));

    const set = useCallback(newValue => {
        if (typeof newValue === 'function') {
            setState((prev) => {
                const result = newValue(prev);

                localStorage.setItem(key, JSON.stringify(result));
                
                return result;
            });
        } else {
            setState(newValue);
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    }, [key]);

    const remove = useCallback(() => {
        setState(undefined);
        localStorage.removeItem(key)
    }, [key]);

    return [state, set, remove];
}

export default useStorage;