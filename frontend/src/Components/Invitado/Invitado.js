import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import TableInvitado from "./TableInvitado";
import BuscaInvitado from "./BuscaInvitado";


class Invitado extends Component {

    render() {
        return (
            <body className="Plantilla-body">
            <div className="col-sm-12">
                <BuscaInvitado/>
            </div>
            <div className="col-sm-12">
                <TableInvitado/>
            </div>
            </body>
        );
    }
}

export default Invitado;