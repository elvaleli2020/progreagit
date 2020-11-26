import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import Header from "../Plantilla/Header";
import Footer from "../Plantilla/Footer";
import Iframe from "../../Global/Iframe";

class Media extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        if(this.props.rol.admin){
            return (
                <div>
                    <Header></Header>
                    <div className="Plantilla-body">
                        <h1>Tutorial: ProgreaGit para Administradores</h1>
                        <Iframe  source="https://www.youtube.com/embed/dQw4w9WgXcQ" ></Iframe>
                    </div>
                    <Footer></Footer>
                </div>
            );
        }else if(this.props.rol.leader){
            console.log("existe rol leader "+this.props.rol.leader);
            return(
                <div>
                    <Header></Header>
                    <div className="Plantilla-body">
                        <h1>Tutorial: ProgreaGit para Líderes</h1>
                        <Iframe  source="https://www.youtube.com/embed/dQw4w9WgXcQ" ></Iframe>
                    </div>
                    <Footer></Footer>
                </div>
            );
        }else{
            console.log("existe rol user "+this.props.rol.user);
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
}

export default Media;