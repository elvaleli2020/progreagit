import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import DataTable from "react-data-table-component";
import LoadingInternal from "../Plantilla/LoadingInternal";
import MostrarMasProyecto from "./MostrarMasProyecto";

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
                name: 'AUTOR',
                selector: 'autores',
                maxWidth: "300px",
                sortable:true
            },
            {
                name: 'DIRECTOR',
                selector: 'director',
                maxWidth: "200px",
                sortable:true
            },
            {
                name: 'FECHA INICIO',
                selector: 'startDate',
                maxWidth: "25px",
                sortable:true
            },
            {
                name: 'FECHA FIN',
                selector: 'endDate',
                maxWidth: "25px",
                sortable:true
            },
            // {
            //     name: 'ACCIONES',
            //     button: true,
            //     cell: () => <a href="#" className="btn btn-primary btn-sm" rel="noopener noreferrer">Ver más</a>
            // }

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
                <div className="col-sm-12 table-responsive">
                    <DataTable
                        columns={this.columnas}
                        data={this.props.data}
                        pagination
                        paginationComponentOptions={this.paginacionOpciones}
                        fixedHeader
                        expandableRows
                        expandableRowDisabled={row => row.disabled}
                        highlightOnHover
                        defaultSortField="name"
                        expandableRowsComponent={<MostrarMasProyecto data={this.props.data} />}
                    />

                </div>
            </div>

        );
    }
}

export default TableAdmin;
