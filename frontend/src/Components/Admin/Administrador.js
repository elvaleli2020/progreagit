import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import AsignaRol from "./AsignaRol";
import BuscaPersonas from "./BuscaPersonas";
import BuscaProyectos from "./BuscaProyectos";
import MediaAdmin from "./MediaAdmin";


class Administrador extends Component {
    render() {
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
