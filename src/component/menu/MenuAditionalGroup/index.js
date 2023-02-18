import Style from './style.module.scss';
import MenuGroupAditional from './../MenuGroupAditional';
import useMenuContext from './../../../hook/useMenuContext';
import AditionalsToAddGroup from './../../AditionalsToAddGroup';
import { NotificationManager } from 'react-notifications';
import { BsFillPlayFill, BsFillPauseFill, BsPlusLg, BsFillTrashFill } from 'react-icons/bs';
import useAppContext from '../../../hook/useAppContext';
const MenuAditionalGroup = ({ menu, aditionalGroup }) => {

    const MenuContext = useMenuContext();
    const { modal } = useAppContext();

    function handlePause() {
        if (aditionalGroup?.id)
            MenuContext.toggleAditionalGroupPause(aditionalGroup.id)
    }

    function handleAdd() {
        modal.showWindow(<h3>Adicionar adicional ao grupo {aditionalGroup.name}</h3>, (
            <AditionalsToAddGroup menu={menu} group={aditionalGroup} />
        ))
    }

    function handleDelete() {
        modal.showConfirm(<h3>Tem certeza de que deseja deletar o grupo de adicionais '{aditionalGroup.name}'?</h3>,
            <center>
                <p>
                    Ao confirmar, você irá deletar este grupo de adicionais <b>permanentemente</b>.<br />
                    Esse processo é <b>IRREVERSÍVEL</b>! <br /><br /> <b>tem certeza de que deseja fazer isso?</b>
                </p>
            </center>,
            (confirmed) => {
                if (confirmed) {
                    MenuContext.deleteAditionalGroup(aditionalGroup.id).then((result) => {
                        if (result)
                            NotificationManager.success(`Grupo de adicionais ${aditionalGroup.name} removido com sucesso!`)
                    })
                }
            })
    }


    return (aditionalGroup &&
        <div className={Style.container}>

            <div className={Style.titleBar}>
                <h3>{aditionalGroup.name} (Min: {aditionalGroup.min} Max: {aditionalGroup.max})</h3>
                <div className={Style.buttons}>
                    <button onClick={handlePause}>{aditionalGroup.paused ? <BsFillPlayFill /> : <BsFillPauseFill />}</button>
                    <button onClick={handleAdd}><BsPlusLg /></button>
                    <button onClick={handleDelete}><BsFillTrashFill /></button>
                </div>
            </div>
            <div className={Style.body}>
                {aditionalGroup.aditionals?.length > 0 ? aditionalGroup.aditionals?.map((aditionalId, index) => <MenuGroupAditional key={`${aditionalId}-${index}`} menu={menu} aditionalGroup={aditionalGroup} aditionalId={aditionalId} />) : <p>Esse grupo de adicionais não possui nenhum adicional.</p>}
            </div>
        </div>
    )
}

export default MenuAditionalGroup