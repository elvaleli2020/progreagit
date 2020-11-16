import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import Header from "../Plantilla/Header";
import Footer from "../Plantilla/Footer";
import Iframe from "../../Global/Iframe";

class MediaAdmin extends Component {
    render() {
        return (
            <div>

                <Header></Header>
                <div className="Plantilla-body">
                    <h1>Este es el componente MediaAdmin</h1>
                    <Iframe  source="https://www.youtube.com/embed/dQw4w9WgXcQ" ></Iframe>
                </div>
                <Footer></Footer>
            </div>


        );
    }
}

export default MediaAdmin;