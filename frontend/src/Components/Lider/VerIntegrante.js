import React, {Component} from 'react';
import {getMenbersGroup} from "../../Util/ApiUtil";
import LoadingInternal from "../Plantilla/LoadingInternal";
import DataTable from "react-data-table-component";
import {Alert} from "react-bootstrap";

class VerIntegrante extends Component {
    constructor(props) {
        super(props);
        this.state = {
            integrantes: [],
            nuevos: [],
            loadingIntegrante: true,
            loadingNuevos: true
        }
        console.log("integrantes: ", this.props);
        this.cargarData();
       }

    cargarIntegrantes() {
        this.setState({loadingIntegrante: true});
        getMenbersGroup()
            .then(response => {
                console.log("Integrantes:", response);
                this.setState({
                    integrantes: response,
                    loadingIntegrante: false
                });
                console.log("El integrante se a eliminado satisfactoriamente");
            }).catch(error => {

            this.setState({loadingIntegrante: false});
            console.log('No se ha podido registrar la información');
        });
    }

    cargarData() {

        this.columnasIntegrantes = [
            {
                name: 'CODIGO',
                selector: 'code',
                sortable: true
            },
            {
                name: 'NOMBRE',
                selector: 'name',
                sortable: true
            },
            {
                name: 'CORREO ELECTRONICO',
                selector: 'email',
                sortable: true
            },
            {
                name: 'ACCIONES',
                button: true,
                cell: row =>
                    <button style={{minWidth: "130px"}}
                            onClick={this.eliminarIntegrante}
                            value={row.idUser}
                            className="btn btn-primary btn-sm" rel="noopener noreferrer">
                        Eliminar
                    </button>
            }
        ];

        this.columnasNuevos = [
            {
                name: 'CODIGO',
                selector: 'code',
                sortable: true
            },
            {
                name: 'NOMBRE',
                selector: 'name',
                sortable: true
            },
            {
                name: 'CORREO ELECTRONICO',
                selector: 'email',
                sortable: true
            },
            {
                name: 'ACCIONES',
                button: true,
                cell: row =>
                    <button style={{minWidth: "130px"}}
                            onClick={this.agregarIntegrante}
                            value={row.idUser}
                            className="btn btn-primary btn-sm" rel="noopener noreferrer">
                        Agregar
                    </button>
            }
        ];

        this.paginacionOpciones = {
            rowsPerPageText: 'Filas por página',
            rangeSeparatorText: 'de',
            selectAllRowsItem: true,
            selectAllRowsItemText: 'Todos'
        }
        this.cargarIntegrantes();
    };

    render() {
        return (
            <div>
                <h1>Ver información de integrantes</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="col-12 table-responsive text-center">
                                    {
                                        this.state.loadingIntegrante ? (
                                            <LoadingInternal></LoadingInternal>
                                        ) : (
                                            <DataTable
                                                title="Integrantes actuales"
                                                columns={this.columnasIntegrantes}
                                                data={this.state.integrantes}
                                                pagination
                                                paginationComponentOptions={this.paginacionOpciones}
                                                fixedHeader
                                            />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <Alert stack={{limit: 3}}
                           timeout = {3000}
                           position='top-right' effect='slide' offset={65} />
                </div>
            </div>
        );
    }
}

export default VerIntegrante;