import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import Iframe from "../../Global/Iframe";

class MediaAdmin extends Component {
    render() {
        return (
            <div className=" form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <h1>Tutorial: ProgreaGit para Administradores</h1>
                </div>
                <br/>
                <div className=" col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <Iframe source="https://www.youtube.com/embed/dQw4w9WgXcQ" ></Iframe>
                </div>
                <br/>
                <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <button className="btn-primary col-12 col-sm-8 col-md-4 col-lg-2 col-xl-2">Ver Manual</button>
                </div>
            </div>
        );
    }
}
export default MediaAdmin;