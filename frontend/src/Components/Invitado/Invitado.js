import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import TableInvitado from "./TableInvitado";
import BuscaInvitado from "./BuscaInvitado";
import Header from "../Plantilla/Header";
import Footer from "../Plantilla/Footer";


class Invitado extends Component {

    render() {
        return (
            <div className="row">
                <div>
                    <a href="./mediaLider" className="nav-link col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                        <i className="nav-icon fas fa-th"></i>
                        <p>
                            Guía de uso
                        </p>
                    </a>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <BuscaInvitado/>
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <TableInvitado/>
                </div>
            </div>

        );
    }
}

export default Invitado;
