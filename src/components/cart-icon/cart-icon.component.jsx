import { UserContext } from '../../contexts/user.context'

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context'

import {CartIconContainer, ShoppingIconStyledComponent,ItemCount} from './cart-icon.style'

import { useContext } from 'react'

const CartIcon = () =>{

    const {isCartOpen, setIsOpen, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsOpen(!isCartOpen);

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconStyledComponent/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;