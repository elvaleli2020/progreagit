import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import {postSearchUser} from "../../Util/ApiUtil";
import DataTable from "react-data-table-component";

class BuscaPersonas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
        this.cargarData();
        this.serviceSearchExt();
        this.serviceSearch = this.serviceSearch.bind(this);
    }

    serviceSearch(event){
        console.log("event", event)
        event.preventDefault();
        this.serviceSearchExt();
    }
    serviceSearchExt(){
        const search = Object.assign({}, this.state);

        postSearchUser(search)
            .then(response => {
                console.log(response);
                this.setState({
                    data: response
                });
            }).catch(error => {
            console.log(error);
        });
    }

    cargarData(){
        this.columnas=[
            {
                name: 'Codigo',
                selector: 'code',
                sortable:true
            },
            {
                name: 'Nombre',
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
        this.Export = ({ onExport }) => (
            <button onClick={e => onExport(e.target.value)}>Export</button>
        );
    }



    render() {
        console.log("ESTADO: ",this.state);
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title"><strong>Búsqueda de personas</strong></h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <form onSubmit={this.serviceSearch} className="col-sm-12 text-sm-right" autoComplete="off">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-lg-2">Buscar por: </label>
                                        <select id="estado"
                                                value={this.state.estado}
                                                onChange={this.handleInputChange} className="form-control col-sm-2 col-lg-2">
                                            <option value="nombre">Nombre</option>
                                            <option value="codigo">Codigo</option>
                                            <option value="email">Correo electronico</option>
                                        </select>
                                        <input type="text" className="col-sm-7 col-lg-7 form-control" id="name"
                                               value={this.state.search}
                                               onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-primary">Buscar</button>
                                    </div>
                                </form>

                                <div className="col-sm-12 table-responsive">

                                    <DataTable
                                        columns={this.columnas}
                                        data={this.state.data}

                                        pagination
                                        paginationComponentOptions={this.paginacionOpciones}
                                        fixedHeader
                                        fixedHeaderScrollHeight="600px"
                                        />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default BuscaPersonas;
