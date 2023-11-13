import {createContext, useReducer } from "react";

import { createAction } from "../utils/reducers/reducers.utils";

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

const INITIAL_STATE={
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) =>{
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }

        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}


export const CartProvider = ({children}) =>{

    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) =>{
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price , 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}));
    }



    const addItemToCart = (productToAdd) =>{
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) =>{
        const newCartItems = removeCartItem(cartItems,productToRemove);
        updateCartItemsReducer(newCartItems);
    }
    
    const clearItemFromCart = (productToClear) =>{
        const newCartItems = clearCartItem(cartItems,productToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsOpen = (bool) =>{
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {
        isCartOpen,
        setIsOpen,
        addItemToCart,
        removeItemFromCart, 
        clearItemFromCart, 
        cartItems, 
        cartCount, 
        cartTotal
    };

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}