import Style from './style.module.scss';

import SidebarButton from './Button';

// icons
import { AiOutlineHome } from 'react-icons/ai';
import { FiSettings, FiUsers } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { RiNewspaperLine } from 'react-icons/ri';
import { MdRestaurantMenu, MdOutlineSportsMotorsports } from 'react-icons/md';

const Sidebar = () => {

    return (
        <ul className={Style.container}>

            <SidebarButton link='/'>
                <AiOutlineHome />
            </SidebarButton>

            <SidebarButton link='/orders'>
                <RiNewspaperLine />
            </SidebarButton>

            {/*
            {window.ipcRenderer && (
                <SidebarButton link='/whatsapp'>
                    <BsWhatsapp />
                </SidebarButton>
            )}

            <SidebarButton link='/menu'>
                <MdRestaurantMenu />
            </SidebarButton>

            <SidebarButton link='/delivery'>
                <MdOutlineSportsMotorsports />
            </SidebarButton>


            <SidebarButton link='/employees'>
                <FiUsers />
            </SidebarButton>
*/}
            <SidebarButton link='/settings'>
                <FiSettings />
            </SidebarButton>

        </ul>
    )
}

export default Sidebar