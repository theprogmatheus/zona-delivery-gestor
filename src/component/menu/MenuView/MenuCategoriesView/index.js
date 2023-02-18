import Style from './style.module.scss';
import useAppContext from '../../../../hook/useAppContext';
import MenuCategory from '../../MenuCategory';
import CreateNewMenuCategoryModal from '../../../modal/menu/Create/CreateNewMenuCategory';

const MenuCategoriesView = ({ menu }) => {


    const { modal } = useAppContext();

    function handleNewCategory() {
        modal.showWindow(<h3>Criar uma categoria em {menu.name}</h3>, <CreateNewMenuCategoryModal menu={menu} />)
    }



    return (
        <ul className={Style.container}>

            {menu?.categories?.map((category) => (
                <li key={category.id}>
                    <MenuCategory menu={menu} category={category} />
                </li>
            ))}



            <li>
                <button className={Style.addButton} onClick={handleNewCategory}>Nova categoria</button>
            </li>
        </ul>
    )
}

export default MenuCategoriesView