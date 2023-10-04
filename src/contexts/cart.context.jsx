import { useState, createContext, useEffect } from "react";

const addCartItem = (cartItmens, productToAdd) => {

    const existingCartItem = cartItmens.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingCartItem){
        return cartItmens.map((cartItmen) => {
           return cartItmen.id === productToAdd.id? {...cartItmen, quantity: cartItmen.quantity +1} : cartItmen;  
        }) 
    }

    return [...cartItmens, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) =>{

    const [isCartOpen,setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }


    const value = {isCartOpen,setIsOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}