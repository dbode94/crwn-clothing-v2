import { useState, createContext, useEffect } from "react";
// import SHOP_DATA from '../shop-data';

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.";

//this is the storage
//as the actual value you want to access
export const CategoriesContext = createContext({
    categoriesMap:{}
});

//this is the component that will wrap around the component that will have access to the data stored in the contexts
export const CategoriesProvider = ({ children }) =>{ //Destructuring children from props

    const [categoriesMap, setCategoriesMap] = useState({}); //this is for the state - state and context need both initial values on their own

    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, [])

    const value = { categoriesMap }; //value passed as value in the Provider below

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider> //less of a brainfuck now days
}