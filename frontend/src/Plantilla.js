import React from 'react';
import './Styles/Plantilla.css';
import Header from './Components/Header'
import Body from './Components/Body'
import Footer from './Components/Footer'
import NavBar from "./Components/NavBar";


function Plantilla() {
    return (
        <div className="Plantilla">
            <NavBar></NavBar>
            <Header></Header>
            <Body></Body>
            <Footer></Footer>
        </div>
    );
}

export default Plantilla;