import React, {Component} from 'react';import $ from 'jquery';
import '../../Styles/Plantilla.css';
import {getSearchProject, postSearchUser} from "../../Util/ApiUtil";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class BuscaPersonas extends Component {
    constructor(props) {
        super(props);
        this.state=[

        ]
        this.serviceSeach = this.serviceSearch.bind(this);
    }
    serviceSearch(event){
        event.preventDefault();
        console.log("Entre al search");
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
    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <h1>Búsqueda de personas</h1>
                        <form onSubmit={this.serviceSeach} className="col-sm-12 text-sm-right" autoComplete="off">
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

                        <div className="col-sm-12">
                            <BootstrapTable options={{noDataText: 'This is custom text for empty data'}}>
                                <TableHeaderColumn dataField='code' isKey>codigo</TableHeaderColumn>
                                <TableHeaderColumn dataField='name'>Nombre</TableHeaderColumn>
                                <TableHeaderColumn dataField='email'>Correo</TableHeaderColumn>
                                <TableHeaderColumn dataField='requestLeader'>Rol solicitado</TableHeaderColumn>
                                <TableHeaderColumn> Asignar</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default BuscaPersonas;