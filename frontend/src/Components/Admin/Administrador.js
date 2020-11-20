import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import BuscaProyectos from "./BuscaProyectos";



class Administrador extends Component {
    render() {
        console.log("Entre otras");
        return (
            <div className="row">
                <div className="col-sm-12">
                    <BuscaProyectos></BuscaProyectos>
                </div>
            </div>
        );
    }
}

export default Administrador;
