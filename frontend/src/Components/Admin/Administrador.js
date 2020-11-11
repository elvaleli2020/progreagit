import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import AsignaRol from "./AsignaRol";
import BuscaPersonas from "./BuscaPersonas";
import BuscaProyectos from "./BuscaProyectos";
import MediaAdmin from "./MediaAdmin";

class Administrador extends Component {
    render() {
        return (
            <div>
                <AsignaRol/>
                <BuscaPersonas/>
                <BuscaProyectos/>
                <MediaAdmin/>
            </div>

        );
    }
}

export default Administrador;