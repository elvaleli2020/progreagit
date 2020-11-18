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

                <div className="col-lg-12">
                    <BuscaInvitado/>
                </div>
                <div className="col-lg-8">
                    <TableInvitado/>
                </div>
            </div>

        );
    }
}

export default Invitado;
