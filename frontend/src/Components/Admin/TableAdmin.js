import React from 'react'
import DataTable from "react-data-table-component";
import MostrarMasProyecto from "./MostrarMasProyecto";

class TableAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.cargarData();
        this.actionMemo = this.actionMemo.bind(this);

    }

    actionMemo(event){
        event.preventDefault();
        this.downloadCSV(this.props.data)

    }
    downloadCSV(array) {
        const link = document.createElement('a');
        let csv = this.convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }
    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    convertArrayOfObjectsToCSV(array) {
        let result;
        const columnDelimiter = ';';
        const lineDelimiter = '\n';
        const keys = Object.keys(this.props.data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;
                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
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
                        actions={<button className="btn btn-sm btn-primary" onClick={this.actionMemo}>Export</button>}
                    />

                </div>
            </div>

        );
    }
}

export default TableAdmin;
