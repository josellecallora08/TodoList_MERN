import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const useUserContext = () => {
    const context = useContext(UserContext)
    if(!context){
        throw Error("Please make the UserContext.Provider the parent of TaskContext.Provider")
    }
    
    return context
}