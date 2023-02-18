import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

const useMenuContext = () => {
    return useContext(MenuContext);
}

export default useMenuContext;