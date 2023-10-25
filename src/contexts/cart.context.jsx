import { useState, createContext, useEffect } from "react";

const removeCartItem = (cartItems, removeItem) =>{
    const found = cartItems.find((cartItem) => cartItem.id === removeItem.id)
    
    if(found.quantity === 1)
        return cartItems.filter((cartItem)=> cartItem.id !== removeItem.id);   
   
    return cartItems.map((cartItem) => cartItem.id === removeItem.id? {...cartItem, quantity: cartItem.quantity-1} : cartItem)
}

const addCartItem = (cartItmens, productToAdd) => {

    const existingCartItem = cartItmens.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingCartItem){
        return cartItmens.map((cartItmen) => {
           return cartItmen.id === productToAdd.id? {...cartItmen, quantity: cartItmen.quantity +1} : cartItmen;  
        }) 
    }

    return [...cartItmens, {...productToAdd, quantity: 1}];
}

const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter((cartItem)=> cartItem.id !== cartItemToRemove.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})



export const CartProvider = ({children}) =>{

    const [isCartOpen,setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price , 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const removeItemFromCart = (productToRemove) =>{
        setCartItems(removeCartItem(cartItems,productToRemove));
    }
    
    const clearItemFromCart = (productToClear) =>{
        setCartItems(clearCartItem(cartItems,productToClear));
    }

    const value = {isCartOpen,setIsOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}