import {CartItemContainer, Image, ItemDetails, Name, Price} from './cart-item.style';

const CartItem = ({cartItem}) =>{
    
    const {name, imageUrl, price , quantity} = cartItem;

    return(
        <CartItemContainer>
            <Image src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Name>{name}</Name>
                <Price className='price'>{quantity} x {price}</Price>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;