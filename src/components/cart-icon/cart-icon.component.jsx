// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import { useDispatch, useSelector } from 'react-redux'

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

import {CartIconContainer, ShoppingIconStyledComponent,ItemCount} from './cart-icon.style'


const CartIcon = () =>{

    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconStyledComponent/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;