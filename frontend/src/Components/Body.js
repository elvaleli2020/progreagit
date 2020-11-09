import React from 'react';
import '../Styles/Plantilla.css';
import TableInvitado from "./TableInvitado";
import BuscaInvitado from "./BuscaInvitado";

function Body() {

    return (
        <body className="Plantilla-body">
        <BuscaInvitado></BuscaInvitado>
        <TableInvitado></TableInvitado>
        </body>
    )

}

export default Body;