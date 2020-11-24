import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class TableInvitado extends React.Component {


    render() {
        return (

            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <BootstrapTable options={{noDataText: 'This is custom text for empty data'}}>
                    <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='título'>Título</TableHeaderColumn>
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