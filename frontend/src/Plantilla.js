import React from 'react';
import './Styles/Plantilla.css';
import Header from './Components/Plantilla/Header'
import Body from './Components/Plantilla/Body'
import Footer from './Components/Plantilla/Footer'
import NavBar from "./Components/Plantilla/NavBar";


function Plantilla() {
    return (
        <div className="Plantilla">
            <NavBar></NavBar>

            <Body></Body>

        </div>
    );
}

export default Plantilla;