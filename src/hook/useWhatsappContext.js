import { useContext } from "react";
import { WhatsappContext } from "../context/WhatsappContext";

const useWhatsappContext = () => {
    const whatsappContext = useContext(WhatsappContext);
    return whatsappContext;
}

export default useWhatsappContext;