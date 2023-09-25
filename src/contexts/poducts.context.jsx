import { useState, createContext } from "react";
import PRODUCTS from '../shop-data.json';


//this is the storage
//as the actual value you want to access
export const ProductsContext = createContext({
    products:[]
});

//this is the component that will wrap around the component that will have access to the data stored in the contexts
export const ProductsProvider = ({ children }) =>{ //Destructuring children from props
     
    const [products, setProducts] = useState(PRODUCTS); //this is for the state - state and context need both initial values on their own
    const value = { products }; //value passed as value in the Provider below

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider> //less of a brainfuck now days
}