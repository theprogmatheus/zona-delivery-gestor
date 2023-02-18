// styles
import Style from './style.module.scss';

// components
import MenuView from '../../component/menu/MenuView';

// hooks
import { useState } from 'react';
import useAppContext from './../../hook/useAppContext';
import useMenuContext from './../../hook/useMenuContext';
import CreateNewMenuModal from './../../component/modal/menu/Create/CreateNewMenu';

const MenuPage = () => {

  const { modal } = useAppContext();
  const { menus } = useMenuContext();
  const [selectedMenu, setSelectedMenu] = useState();

  const handleCreateNewMenu = () => {
    modal.showWindow(<h3>Criar um novo cardápio</h3>, <CreateNewMenuModal />)
  }

  return (
    <div className={Style.container}>
      <div className={Style.menuSelect}>
        <select className={Style.menuSelectInput} onChange={(e) => setSelectedMenu(e.target.value)} disabled={!(menus && menus.length)}>
          <option value='' hidden>{menus && menus.length > 0 ? 'Cardápios' : 'Nenhum cardápio encontrado'}</option>
          {menus?.map((menu) => (<option key={menu.id} value={menu.id}>{menu.name}</option>))}
        </select>
        <button onClick={handleCreateNewMenu}>Novo Cardápio</button>
      </div>
      <MenuView menu={menus?.find((menu) => menu.id === selectedMenu)} />
    </div>
  )
}

export default MenuPage