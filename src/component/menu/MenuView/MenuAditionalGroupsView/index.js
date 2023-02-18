import Style from './style.module.scss';
import MenuAditionalGroup from './../../MenuAditionalGroup';
import useAppContext from '../../../../hook/useAppContext';
import CreateNewMenuAditionalGroup from './../../../modal/menu/Create/CreateNewMenuAditionalGroup';

const MenuAditionalGroupsView = ({ menu }) => {

  const { modal } = useAppContext();

  function handleNewAditionalGroup() {
    modal.showWindow(<h3>Criar um grupo de adicionais em {menu.name}</h3>, <CreateNewMenuAditionalGroup menu={menu} />)
  }

  return (
    <ul className={Style.container}>
      {menu?.aditionalGroups?.map((aditionalGroup) => (
        <li key={aditionalGroup.id}>
          <MenuAditionalGroup menu={menu} aditionalGroup={aditionalGroup} />
        </li>
      ))}
      <li>
        <button className={Style.addButton} onClick={handleNewAditionalGroup}>Novo grupo de adicionais</button>
      </li>
    </ul>
  )
}

export default MenuAditionalGroupsView