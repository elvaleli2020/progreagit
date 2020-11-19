import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import DataTable from "react-data-table-component";

class TableAdmin extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.cargarData();
    }
    cargarData(){
        this.columnas=[
            {
                name: 'ID',
                selector: 'id',
                sortable:true
            },
            {
                name: 'Titulo',
                selector: 'name',
                sortable:true
            },
            {
                name: 'Correo electronico',
                selector: 'email',
                sortable:true
            },
            {
                name: 'Solicitusd lider',
                selector: 'requestLeader',
                sortable:true
            }
        ];
        this.paginacionOpciones={
            rowsPerPageText: 'Filas por página',
            rangeSeparatorText:'de',
            selectAllRowsItem: true,
            selectAllRowsItemText: 'Todos'
        }
    }

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
