import { useState, createContext } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {}
})

export const CartProvider = ({children}) =>{

    const [isCartOpen,setIsOpen] = useState(false);

    const value = {isCartOpen,setIsOpen};

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}