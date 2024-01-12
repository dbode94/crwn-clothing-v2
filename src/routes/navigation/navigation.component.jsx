import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { signOutUser } from "../../utils/firebase/firebase.utils.";


import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from './navigation.styles'



const Navigation = () =>{
    const currentUser= useSelector(selectCurrentUser)
    // const {isCartOpen} = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen);

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to= '/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser? (<NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>) : (<NavLink to='/auth'> Sign In</NavLink>)
                    }
                    <CartIcon/>
                </NavLinksContainer>
                {/* All functional component are true */}
                { isCartOpen && <CartDropdown/>} 
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
  }

  export default Navigation;