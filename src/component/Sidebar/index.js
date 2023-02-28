import Style from './style.module.scss';

import SidebarButton from './Button';

// icons
import { AiOutlineUser } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { SiIfood } from 'react-icons/si';
import { RiNewspaperLine } from 'react-icons/ri';
import { MdOutlineSportsMotorsports } from 'react-icons/md';
import { GoGraph } from 'react-icons/go';

const Sidebar = () => {

    return (
        <ul className={Style.container}>

            <SidebarButton link='/'>
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
            
            <SidebarButton link='/employees'>
                <FiUsers />
            </SidebarButton>
*/}
            <SidebarButton link='/ifood'>
                <SiIfood />
            </SidebarButton>
            <SidebarButton link='/delivery'>
                <MdOutlineSportsMotorsports />
            </SidebarButton>

            <SidebarButton link='/analytics'>
                <GoGraph />
            </SidebarButton>

            <SidebarButton link='/account'>
                <AiOutlineUser />
            </SidebarButton>

            <SidebarButton link='/settings'>
                <FiSettings />
            </SidebarButton>

        </ul>
    )
}

export default Sidebar