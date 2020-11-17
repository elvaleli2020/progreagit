import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import TableInvitado from "./TableInvitado";
import BuscaInvitado from "./BuscaInvitado";
import Header from "../Plantilla/Header";
import Footer from "../Plantilla/Footer";


class Invitado extends Component {

    render() {
        return (
            <div>
                <Header></Header>
                <body className="Plantilla-body">
                <div className="col-sm-12">
                    <BuscaInvitado/>
                </div>
                <div className="col-sm-12">
                    <TableInvitado/>
                </div>
                </body>
                <Footer></Footer>
            </div>

        );
    }
}

export default Invitado;