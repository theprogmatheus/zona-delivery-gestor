import Style from './style.module.scss';
import MenuItem from './../../MenuItem';
import CreateNewMenuItemModal from './../../../modal/menu/Create/CreateNewMenuItem';
import useAppContext from '../../../../hook/useAppContext';

const MenuItemsView = ({ menu }) => {

  const { modal } = useAppContext();

  function handleCreateNewItem() {
    modal.showWindow(<h3>Novo item</h3>, <CreateNewMenuItemModal menu={menu} />);
  }

  return (
    <ul className={Style.container}>
      {menu?.items?.map((item) => (
        <li key={item.id}>
          <MenuItem menu={menu} item={item} />
        </li>
      ))}
      <li>
        <button className={Style.addButton} onClick={handleCreateNewItem}>Novo Item</button>
      </li>
    </ul>
  )
}

export default MenuItemsView