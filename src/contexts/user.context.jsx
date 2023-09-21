import { createContext, useState, useEffect} from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils.";

//this is the storage
//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

//this is the component that will wrap around the component that will have access to the data stored in the contexts
export const UserProvider = ({children}) =>{ //Destructuring children from props
     
    const [currentUser, setCurrentUser] = useState(null); //this is for the state - state and context need both initial values on their own
    const value = {currentUser, setCurrentUser} //value passed as value in the Provider below

    useEffect(() =>{
        const unsubscribe = onAuthStateChangedListener((user) =>{
            if(user) createUserDocumentFromAuth(user);
            setCurrentUser(user)
        })
        return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider> //brainfuck
}