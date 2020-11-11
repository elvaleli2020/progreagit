import React from 'react';
import '../../Styles/Plantilla.css';
import logo from "../../Images/logo_ufps.png";


function Header() {

    return (
        <header className="Plantilla-header">
            <img src={logo} className="Plantilla-logo" alt="logo"/>
        </header>
    )

}

export default Header;