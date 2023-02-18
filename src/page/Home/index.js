import Style from './style.module.scss';
import logo from './../../assets/img/logo.png';
import { useState, useEffect } from 'react';
import IFoodMerchantsGroup from '../../component/IFoodMerchantsGroup';
import useAppContext from '../../hook/useAppContext';

const HomePage = () => {

    const { ifoodMerchants } = useAppContext();

    const getCurrentDateString = () => {
        const date = new Date();

        return `${date.toLocaleDateString("pt-BR")} - ${date.toLocaleTimeString("pt-BR")}`;
    }

    const [dateString, setDateString] = useState(getCurrentDateString())



    useEffect(() => {

        const task = setInterval(() => {
            setDateString(getCurrentDateString())
        }, 500);

        return () => {
            clearInterval(task);
            // cancel task
        }
    }, [])





    return (
        <div className={Style.container}>
            <div className={Style.brand}>
                <div>
                    <img
                        className={Style.logo}
                        alt='Pizzaria Independência'
                        src={logo}
                    />
                </div>

                <h3 className={Style.dateTime}>{dateString}</h3>
                <div>
                    <IFoodMerchantsGroup ifoodMerchants={ifoodMerchants} />
                </div>

            </div>
            <div className={Style.content}>
                <center>
                    <p>Ultima atualização em 24/01/2023</p>
                </center>
            </div>
        </div>
    )
}

export default HomePage