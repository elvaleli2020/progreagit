import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import MostrarMasProyecto from "../Admin/MostrarMasProyecto";
import DataTable from "react-data-table-component";

class TableInvitado extends React.Component {

    constructor(props) {
        super(props);
        this.cargarDatos();
        this.state= {
            hasdata: 0
        }

        if(this.props.data.length!=0)
            this.state.hasdata=1;
        console.log(this.props.data, this.props.data.length);
    }
    cargarDatos(){
        this.columnas=[
            {
                name: 'ACRONIMO',
                selector: 'acronym',
                sortable:true
            },
            {
                name: 'TITULO',
                selector: 'name',
                sortable:true
            },
            {
                name: 'AUTORES',
                selector: 'autores',
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
                    this.state.hasdata==0?(
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
