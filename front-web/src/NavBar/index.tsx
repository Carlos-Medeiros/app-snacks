import React from 'react';
import './styles.css';
import { ReactComponent as Logo } from '../logo.svg'
import { ReactComponent as Car } from '../carrinho.svg'

function NavBar() {
    return(
        <nav className="main-navbar">
            <Logo className="logo"/>
            <nav className="shopping-car">
                <Car className="car"/>
            </nav>
        </nav>
    )

}

export default NavBar;