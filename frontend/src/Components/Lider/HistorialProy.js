import React from 'react';
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class HistorialProy extends React.Component{
    render(){
        return(
            <div className="col-sm-12">
                <BootstrapTable options={{noDataText: 'This is custom text for empty data'}}>
                    <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='título'>Título</TableHeaderColumn>
                    <TableHeaderColumn dataField='estado'>Estado</TableHeaderColumn>
                    <TableHeaderColumn dataField='director'>Director(es) / Codirector(es)</TableHeaderColumn>
                    <TableHeaderColumn dataField='rol'>Rol</TableHeaderColumn>
                    <TableHeaderColumn dataField='anio'>Año</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
export default HistorialProy;