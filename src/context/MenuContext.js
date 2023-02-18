import { createContext } from "react";
import { useState, useEffect } from "react";
import useAppContext from './../hook/useAppContext';
import { NotificationManager } from 'react-notifications';

export const MenuContext = createContext();

export const MenuContextProvider = ({ children }) => {

    const { api, settings } = useAppContext();
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        refresh();
    }, [settings])

    const refreshMenus = () => {
        invoke('menuManager.menus').then((menus) => {
            if (menus)
                setMenus(JSON.parse(menus))
        })
    }

    async function invoke(handleName, ...args) {
        if (window.ipcRenderer) {
            if (args && args.length > 0)
                args = args.map(arg => JSON.stringify(arg));
            return await window.ipcRenderer.invoke(handleName, ...args);
        }
    }

    function refresh() {
        refreshMenus()
    }

    function saveAndReturn(returnValue) {
        invoke('menuManager.save').then(() => refreshMenus())
        return returnValue;
    }

    function refreshAndReturn(returnValue) {
        refreshMenus()
        return returnValue;
    }


    async function createMenu(name) {
        const menu = await invoke('menuManager.createMenu', [name]);
        return saveAndReturn(menu);
    }

    async function deleteMenu(menuId) {
        await invoke('menuManager.deleteMenu', [menuId]);
        return saveAndReturn(true);
    }

    async function createCategory(menuId, name) {
        const category = await invoke('menuManager.createMenuCategory', [menuId, name]);
        return saveAndReturn(category)
    }

    async function deleteCategory(categoryId) {
        await invoke('menuManager.deleteMenuCategory', [categoryId]);
        return saveAndReturn(true);
    }

    async function createItem(menuId, name, description, price, image) {
        const item = await invoke('menuManager.createMenuItem', [menuId, name, description, price, image, 0])
        return saveAndReturn(item)
    }

    async function deleteItem(itemId) {
        await invoke('menuManager.deleteMenuItem', [itemId]);
        return saveAndReturn(true);
    }

    async function createAditional(menuId, name, description, price, minAmount, maxAmount) {
        const aditional = await invoke('menuManager.createMenuItemAditional', [menuId, name, description, price, minAmount, maxAmount]);
        return saveAndReturn(aditional);
    }

    async function deleteAditional(aditionalId) {
        await invoke('menuManager.deleteMenuItemAditional', [aditionalId])
        return saveAndReturn(true);
    }

    async function createAditionalGroup(menuId, name, min, max) {
        const aditionalGroup = await invoke('menuManager.createMenuItemAditionalGroup', [menuId, name, min, max]);
        return saveAndReturn(aditionalGroup);
    }

    async function deleteAditionalGroup(groupId) {
        await invoke('menuManager.deleteMenuItemAditionalGroup', [groupId])
        return saveAndReturn(true);
    }

    async function getMenuItem(itemId) {
        const menuItem = await invoke('menuManager.getMenuItem', [itemId]);
        return refreshAndReturn(menuItem);
    }

    async function getMenuAditional(aditionalId) {
        const aditional = await invoke('menuManager.getMenuItemAditional', [aditionalId]);
        return refreshAndReturn(aditional)
    }

    async function getMenuAditionalGroup(aditionalId) {
        const aditionalGroup = await invoke('menuManager.getMenuItemAditionalGroup', [aditionalId]);
        return refreshAndReturn(aditionalGroup)
    }
    async function addMenuItemToCategory(itemId, categoryId) {
        await invoke('menuManager.addMenuItemToCategory', [itemId, categoryId])
        return saveAndReturn(true);
    }
    async function addAditionalGroupToItem(groupId, itemId) {
        await invoke('menuManager.addMenuItemAditionalGroupToItem', [groupId, itemId])
        return saveAndReturn(true);
    }

    async function addAditionalToGroup(aditionalId, groupId) {
        await invoke('menuManager.addMenuItemAditionalToGroup', [aditionalId, groupId])
        return saveAndReturn(true);
    }

    async function removeAditionalFromGroup(aditionalId, groupId) {
        await invoke('menuManager.removeMenuItemAditionalFromGroup', [aditionalId, groupId])
        return saveAndReturn(true);
    }

    async function removeMenuItemFromCategory(itemId, categoryId) {
        await invoke('menuManager.removeMenuItemFromCategory', [itemId, categoryId])
        return saveAndReturn(true);
    }
    async function removeAditionalGroupFromItem(groupId, itemId) {
        await invoke('menuManager.removeMenuItemAditionalGroupFromItem', [groupId, itemId])
        return saveAndReturn(true);
    }

    async function toggleMenuCategoryPause(categoryId) {
        await invoke('menuManager.toggleMenuCategoryPause', [categoryId]);
        return saveAndReturn(true);
    }
    async function toggleMenuItemPause(itemId) {
        await invoke('menuManager.toggleMenuItemPause', [itemId]);
        return saveAndReturn(true);
    }

    async function toggleAditionalPause(aditionalId) {
        await invoke('menuManager.toggleAditionalPause', [aditionalId]);
        return saveAndReturn(true);
    }

    async function toggleAditionalGroupPause(groupId) {
        await invoke('menuManager.toggleAditionalGroupPause', [groupId]);
        return saveAndReturn(true);
    }
    return (
        <MenuContext.Provider
            value={{
                menus,
                refresh,
                createMenu,
                deleteMenu,
                createCategory,
                deleteCategory,
                createItem,
                deleteItem,
                createAditional,
                deleteAditional,
                createAditionalGroup,
                deleteAditionalGroup,
                addMenuItemToCategory,
                getMenuItem,
                removeMenuItemFromCategory,
                toggleMenuCategoryPause,
                toggleMenuItemPause,
                toggleAditionalPause,
                toggleAditionalGroupPause,
                getMenuAditional,
                addAditionalGroupToItem,
                getMenuAditionalGroup,
                removeAditionalGroupFromItem,
                addAditionalToGroup,
                removeAditionalFromGroup
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}
