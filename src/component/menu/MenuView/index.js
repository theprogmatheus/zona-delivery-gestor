import Style from './style.module.scss';

import useAppContext from './../../../hook/useAppContext';
import { NotificationManager } from 'react-notifications';
import { MdRestaurantMenu } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import useMenuContext from './../../../hook/useMenuContext';
import { useState } from 'react';


// Views
import MenuAditionalsView from './MenuAditionalsView';
import MenuCategoriesView from './MenuCategoriesView';
import MenuItemsView from './MenuItemsView';
import MenuAditionalGroupsView from './MenuAditionalGroupsView';


const views = [
    {
        name: 'categories',
        label: 'Categorias',
        element: MenuCategoriesView
    },
    {
        name: 'items',
        label: 'Itens',
        element: MenuItemsView
    },
    {
        name: 'aditionalGroups',
        label: 'Grupos de Adicionais',
        element: MenuAditionalGroupsView
    },
    {
        name: 'aditionals',
        label: 'Adicionais',
        element: MenuAditionalsView
    },
]

const MenuView = ({ menu }) => {

    const MenuContext = useMenuContext();
    const { modal } = useAppContext();

    const [activeView, setActiveView] = useState(views[0]);

    const handleDeleteThisMenu = () => {
        modal.showConfirm(<h3>Tem certeza de que deseja deletar o cardápio '{menu.name}'?</h3>,
            <center>
                <p>
                    Ao confirmar, você irá deletar este cardápio e <b>TODOS</b> os itens que há nele <b>permanentemente</b>.<br />
                    Esse processo é <b>IRREVERSÍVEL</b>! <br /><br /> <h3>tem certeza de que deseja fazer isso?</h3>
                </p>
            </center>,
            (confirmed) => {
                if (confirmed)
                    MenuContext.deleteMenu(menu.id).then((result) => {
                        if (result)
                            NotificationManager.success(`Cardápio ${menu.name} deletado com sucesso!`)
                    })
            })
    }


    return (
        <div className={Style.container}>
            {menu ? (<>
                <button onClick={handleDeleteThisMenu} style={{
                    background: "red",
                    position: "absolute",
                    right: "10px",
                    width: "5px",
                    height: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem"
                }}><BsFillTrashFill /></button>
                <ul className={Style.navbar}>
                    {views.map((view) => (
                        <li key={view.name}>
                            <button className={activeView?.name === view.name ? Style.active : ''} onClick={() => setActiveView(view)}>{view.label}</button>
                        </li>
                    )
                    )}
                </ul>
                <div className={Style.view}>
                    <activeView.element menu={menu} />
                </div>

            </>)
                : (
                    <div className={Style.noContent}>
                        <h1><MdRestaurantMenu /></h1>
                        <h3>Cardápios</h3>
                        <p>
                            Gerencie todos os cardápios do seu restaurante, crie, edite, pause e exclua itens de seus cardápios.
                        </p>
                        <p>
                            Para começar você pode selecionar um cardápio acima, ou criar um cardápio novo.
                        </p>
                    </div>
                )}
        </div>
    )
}

export default MenuView;