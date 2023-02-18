import Style from './style.module.scss';

import { BsFillTrashFill } from 'react-icons/bs';
import { useState } from 'react';

const ChangeMenuCategory = ({ menu, category }) => {

  const [categoryName, setCategoryName] = useState(category?.name);
  const [items, setItems] = useState();

  function handleSubmit(e) {
    e.preventDefault();
  }



  return (
    <form className={Style.container} onSubmit={handleSubmit}>
      {console.log(menu, category)}

      {/*<input className={Style.nameInput} placeholder='Nome da categoria' onChange={(e) => setCategoryName(e.target.value)} value={categoryName} />*/}


      <form className={Style.items}>
        <h3>Habilitar itens na categoria</h3>
        {menu?.items?.map((item) => (
          <label>
            <span>{item.name}</span>
            <input key={item.id} type='checkbox' />
          </label>
        ))}
      </form>

    </form>
  )
}

export default ChangeMenuCategory