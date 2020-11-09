import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class TableInvitado extends React.Component {


    render() {
        return (

            <div className="col-sm-12">
                <BootstrapTable options={{noDataText: 'La tabla se encuentra vacía'}}>
                    <TableHeaderColumn dataField='título' isKey>Título</TableHeaderColumn>
                    <TableHeaderColumn dataField='lider'>Líder de proyecto</TableHeaderColumn>
                    <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='director'>Director</TableHeaderColumn>
                    <TableHeaderColumn dataField='anio'>Año</TableHeaderColumn>
                </BootstrapTable>
            </div>


        );
    }
}

export default TableInvitado;