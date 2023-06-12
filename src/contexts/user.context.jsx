import { createContext, useState} from "react";

//this is the storage
//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

//this is the component that will wrap around the component that will have access to the data stored in the contexts
export const UserProvider = ({children}) =>{
     
    const [currentUser, setCurrentUser] = useState(null); //this is for the state - state and context need both initial values on their own
    const value = {currentUser, setCurrentUser}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}