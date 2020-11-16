import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import Header from "../Plantilla/Header";
import Iframe from "../../Global/Iframe";
import Footer from "../Plantilla/Footer";


class MediaInv extends Component {

    render() {
        return (
            <div>
                <Header></Header>
                <div className="Plantilla-body">
                    <h1>Tutorial: ProgreaGit para Invitados</h1>
                    <Iframe  source="https://www.youtube.com/embed/dQw4w9WgXcQ" ></Iframe>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default MediaInv;