import Style from './style.module.scss';

import { useNavigate, useLocation } from 'react-router-dom';


const SidebarButton = ({ children, onClick, active, link }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleDefaultClick = () => {
        if (link)
            navigate(link)
    }

    const isActive = () => location?.pathname?.toLocaleLowerCase() === link?.toLocaleLowerCase();

    return (
        <li className={Style.container}>
            <button className={`${Style.button} ${(active || isActive()) ? Style.active : ''}`} onClick={onClick ? onClick : handleDefaultClick}>
                {children}
            </button>
        </li>
    )

}

export default SidebarButton