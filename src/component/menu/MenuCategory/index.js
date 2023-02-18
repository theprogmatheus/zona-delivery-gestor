import Style from './style.module.scss';
import MenuCategoryItem from './../MenuCategoryItem';
import useAppContext from './../../../hook/useAppContext';
import useMenuContext from './../../../hook/useMenuContext';
import { NotificationManager } from 'react-notifications';
import { BsPlusLg, BsFillPauseFill, BsFillPlayFill, BsFillTrashFill } from 'react-icons/bs';
import ItemsToAddList from '../../ItemsToAddList';

const MenuCategory = ({ menu, category }) => {


    const MenuContext = useMenuContext();
    const { modal } = useAppContext();

    function handlePauseCategory() {
        if (category?.id)
            MenuContext.toggleMenuCategoryPause(category.id)
    }


    function handleDeleteCategory() {
        modal.showConfirm(<h3>Tem certeza de que deseja deletar a categoria '{category.name}'?</h3>,
            <center>
                <p>
                    Ao confirmar, você irá deletar esta categoria <b>permanentemente</b>.<br />
                    Esse processo é <b>IRREVERSÍVEL</b>! <br /><br /> <b>tem certeza de que deseja fazer isso?</b>
                </p>
            </center>,
            (confirmed) => {
                if (confirmed)
                    MenuContext.deleteCategory(category.id).then((result) => {
                        if (result)
                            NotificationManager.success(`Categoria ${category.name} deletada com sucesso!`)
                    })
            })
    }

    function handleAddItem() {
        modal.showWindow(<h3>Adicionar item a categoria {category.name}</h3>, (
            <ItemsToAddList menu={menu} category={category} />
        ))
    }


    return (
        <div className={Style.container}>

            <div className={Style.titleBar}>
                <h3>{category.name}</h3>
                <div className={Style.buttons}>
                    <button onClick={handlePauseCategory}>{category.paused ? <BsFillPlayFill /> : <BsFillPauseFill />}</button>
                    <button onClick={handleAddItem}><BsPlusLg /></button>
                    <button onClick={handleDeleteCategory}><BsFillTrashFill /></button>
                </div>
            </div>
            <div className={Style.body}>
                {category.items?.length > 0 ? category.items?.map((itemId, index) => <MenuCategoryItem key={`${itemId}-${index}`} menu={menu} category={category} itemId={itemId} />) : <p>Essa categoria não possui nenhum item adicionado.</p>}
            </div>
        </div>
    )
}

export default MenuCategory