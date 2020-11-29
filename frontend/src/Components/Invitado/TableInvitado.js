import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import MostrarMasProyecto from "../Admin/MostrarMasProyecto";
import DataTable from "react-data-table-component";

class TableInvitado extends React.Component {

    constructor(props) {
        super(props);
        this.cargarDatos();
    }
    cargarDatos(){
        this.columnas=[
            {
                name: 'ID',
                selector: 'idProject',
                maxWidth: "20px",
                sortable:true
            },
            {
                name: 'TITULO',
                selector: 'name',
                maxWidth: "300px",
                sortable:true
            },
            {
                name: 'AUTORES',
                selector: 'autores',
                maxWidth: "300px",
                sortable:true
            },
            {
                name: 'DIRECTOR',
                selector: 'director',
                maxWidth: "200px",
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

            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                {
                    this.props.data.length==0?(
                        <div>No dispone de datos</div>
                    ):(
                        <DataTable
                            columns={this.columnas}
                            data={this.props.data}
                            pagination
                            paginationComponentOptions={this.paginacionOpciones}
                            fixedHeader
                        />
                    )
                }

            </div>

        );
    }
}

export default TableInvitado;