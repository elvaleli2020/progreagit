import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class TableAdmin extends React.Component {


    render() {
        return (

            <div className="col-sm-12">
                <BootstrapTable options={{noDataText: 'This is custom text for empty data'}}>
                    <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='título'>Título</TableHeaderColumn>
                    <TableHeaderColumn dataField='autor'>Autor(es)</TableHeaderColumn>
                    <TableHeaderColumn dataField='director'>Director(es) / Codirector(es)</TableHeaderColumn>
                    <TableHeaderColumn dataField='anio'>Año</TableHeaderColumn>
                    <TableHeaderColumn dataField='fechaReg'>Fecha de Registro</TableHeaderColumn>
                </BootstrapTable>
            </div>

        );
    }
}

export default TableAdmin;