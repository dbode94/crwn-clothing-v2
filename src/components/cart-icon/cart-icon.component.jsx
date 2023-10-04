import { UserContext } from '../../contexts/user.context'

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context'

import './cart-icon.style.scss'
import { useContext } from 'react'

const CartIcon = () =>{

    const {isCartOpen, setIsOpen, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsOpen(!isCartOpen);

    return(
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;