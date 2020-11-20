import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import {postSearchUser} from "../../Util/ApiUtil";
import DataTable from "react-data-table-component";
import LoadingInternal from "../Plantilla/LoadingInternal";
import {handleInputChange} from "../../Util/FormUtil";

class BuscaPersonas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            loading:true,
            estado:"nombre",
            search:""
        };
        this.loading= true;

        this.cargarData();
        this.serviceSearchExt();
        this.serviceSearch = this.serviceSearch.bind(this);
        this.handleInputChange = handleInputChange.bind(this);
    }

    serviceSearch(event){
        console.log("event", event)
        event.preventDefault();
        this.serviceSearchExt();
    }
    serviceSearchExt(){
        let search = Object.assign({}, {});
        if(this.state.search!="") {
            if (this.state.estado == "nombre") {
                search = Object.assign({}, {name: this.state.search});
            } else if (this.state.estado == "codigo") {
                search = Object.assign({}, {code: this.state.search});
            } else if (this.state.estado == "email") {
                search = Object.assign({}, {email: this.state.search});
            }
        }
        this.setState({
            loading:true
        });
        postSearchUser(search)
            .then(response => {
                console.log(response);
                this.setState({
                    loading:false,
                    data: response
                });
            }).catch(error => {
            this.state.loading=false;
            console.log(error);
        });
    }

    cargarData(){
        this.columnas=[
            {
                name: 'CODIGO',
                selector: 'code',
                sortable:true
            },
            {
                name: 'NOMBRE',
                selector: 'name',
                sortable:true
            },
            {
                name: 'CORREO ELECTRONICO',
                selector: 'email',
                sortable:true
            },
            {
                name: 'SOLICITUDO LIDER',
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
                                                defaultValue={this.state.estado}
                                                onChange={this.handleInputChange} className="form-control col-sm-2 col-lg-2">
                                            <option value="nombre">Nombre</option>
                                            <option value="codigo">Codigo</option>
                                            <option value="email">Correo electronico</option>
                                        </select>
                                        <input type="text" className="col-sm-6 col-lg-6 form-control" id="search"
                                               value={this.state.search}
                                               onChange={this.handleInputChange}/>

                                        <div className="form-group col-sm-1">
                                            <button type="submit" className="btn btn-primary">Buscar</button>
                                        </div>
                                    </div>

                                </form>

                                <div className=" col-sm-12 margin-bottom"></div>

                                <div className="col-sm-12 table-responsive">
                                    {
                                        this.state.loading?(
                                            <LoadingInternal></LoadingInternal>
                                        ):(
                                            <DataTable
                                                columns={this.columnas}
                                                data={this.state.data}

                                                pagination
                                                paginationComponentOptions={this.paginacionOpciones}
                                                fixedHeader
                                                fixedHeaderScrollHeight="600px"
                                            />
                                        )
                                    }

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
