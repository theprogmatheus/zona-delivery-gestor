import useAppContext from "../../../../hook/useAppContext"
import CreateNewMenuAditionalModal from "../../../modal/menu/Create/CreateNewMenuAditional";
import MenuAditional from "../../MenuAditional";
import Style from './style.module.scss';

const MenuAditionalsView = ({ menu }) => {

  const { modal } = useAppContext();

  function handleNewAditional() {
    modal.showWindow(<h3>Novo adicional</h3>, <CreateNewMenuAditionalModal menu={menu} />)
  }

  return (
    <ul className={Style.container}>
      {menu?.aditionals?.map((aditional) => (
        <li key={aditional.id}>
          <MenuAditional aditional={aditional} />
        </li>
      )
      )}
      <li>
        <button className={Style.addButton} onClick={handleNewAditional}>Novo adicional</button>
      </li>
    </ul>
  )
}

export default MenuAditionalsView