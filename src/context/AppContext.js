import { createContext } from "react";
import { useState, useEffect } from 'react';

import useStorage from './../hook/useStorage';
import useModal from '../hook/useModal';
import Settings from './../settings/Settings';
// import useIFoodWidget from "../hook/useIFoodWidget";


import { WhatsappContextProvider } from './WhatsappContext';
import { OrderContextProvider } from './OrderContext';
import { MenuContextProvider } from './MenuContext';

import API from './../api/API';

console.log('render context')
const api = new API();
const settings = new Settings(api);

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const [state, setState] = useStorage("app.context");

    const [authenticated, setAuthenticated] = useState(false);
    const modal = useModal();

    // settings

    const [ifoodMerchants, setIfoodMerchants] = useState();

    // ifood
    // const IFoodWidget = useIFoodWidget();


    useEffect(() => {
        // lista os merchants... pega o status de cada e adiciona no ifoodMechants... d

        const handleIfoodMerchants = async () => {
            if (settings.values.restaurant.id){
                const ifoodMerchants = await api.requests.listIFoodMerchants(settings.values.restaurant.id);
                if (ifoodMerchants) {
                    for (let i = 0; i < ifoodMerchants.length; i++) {
                        const ifoodMerchant = ifoodMerchants[i];
                        ifoodMerchant.status = await api.requests.getIFoodMerchantStatus(settings.values.restaurant.id, ifoodMerchant.merchantId);
                    }
                    setIfoodMerchants(ifoodMerchants);
                }
            }
        }

        handleIfoodMerchants();
        const interval = setInterval(handleIfoodMerchants, 30000);
        return () => {
            clearInterval(interval);
        }
    }, [])

    useEffect(() => {
        const checkIsAuthenticated = () =>
            setAuthenticated(api.isAuthenticated())

        checkIsAuthenticated();

        const interval = setInterval(checkIsAuthenticated, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [])


    useEffect(() => {

        // if (authenticated)
        //    IFoodWidget.create()
        //else
        //    IFoodWidget.destroy()

    }, [authenticated])


    return (
        <AppContext.Provider
            value={{ api, state, setState, authenticated, setAuthenticated, modal, settings, ifoodMerchants }}
        >
            <WhatsappContextProvider>
                <OrderContextProvider>
                    <MenuContextProvider>
                        {children}
                        {modal.JSX}
                    </MenuContextProvider>
                </OrderContextProvider>
            </WhatsappContextProvider>
        </AppContext.Provider>
    )
}
