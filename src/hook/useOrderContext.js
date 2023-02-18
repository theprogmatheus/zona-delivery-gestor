import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const useOrderContext = () => {
    const context = useContext(OrderContext);
    return context;
}

export default useOrderContext;