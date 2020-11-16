import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import AsignaRol from "./AsignaRol";
import BuscaPersonas from "./BuscaPersonas";
import BuscaProyectos from "./BuscaProyectos";
import MediaAdmin from "./MediaAdmin";


class Administrador extends Component {
    render() {
        return (

            <div className="container-fluid h-100">
                <div className="row h-100">
                    <aside className="col-12 col-md-2 p-0 bg-danger">
                        <nav
                            className="navbar navbar-expand navbar-dark bg-danger flex-md-column flex-row align-items-start">
                            <div className="collapse navbar-collapse">
                                <ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                                    <li className="nav-item">
                                        <a className="nav-link pl-0" href="#">Link</a>
                                    </li>
                                    ..
                                </ul>
                            </div>
                        </nav>
                    </aside>
                    <main className="col">
                        <BuscaProyectos></BuscaProyectos>
                    </main>
                </div>

                {/*<AsignaRol/>*/}
                {/*<BuscaPersonas/>*/}
                {/*<MediaAdmin/>*/}
            </div>





        );
    }
}

export default Administrador;