import React, {Component} from 'react'
import DataTable from "react-data-table-component";
import {getMenbersGroup, postSearchUser, postAssignarMember, postUnAssignarMember} from "../../Util/ApiUtil";
import {Alert} from "react-bootstrap";
import LoadingInternal from "../Plantilla/LoadingInternal";

class Integrantes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            integrantes:[],
            nuevos:[],
            loadingIntegrante:true,
            loadingNuevos:true
        }
        console.log("integrantes: ",this.props);
        this.cargarData();
        this.eliminarIntegrante = this.eliminarIntegrante.bind(this);
        this.agregarIntegrante = this.agregarIntegrante.bind(this);

    }

    cargarIntegrantes(){
        this.setState({loadingIntegrante: true});
        getMenbersGroup()
            .then(response => {
                console.log("Integrantes:",response);
                this.setState({
                    integrantes:response,
                    loadingIntegrante: false});
                console.log("El integrante se a eliminado satisfactoriamente");
            }).catch(error => {

                this.setState({loadingIntegrante: false});
                console.log('No se ha podido registrar la información');
        });
    }

    cargarPosiblesIntegrantes(){
        const search = Object.assign({}, {});
        this.setState({loadingNuevos: true});
        postSearchUser(search)
            .then(response => {
                this.loading=false;
                this.setState({
                    nuevos: response,
                    loadingNuevos:false
                });
            }).catch(error => {
            this.state.loadingNuevos = false;
        });
    }

    eliminarIntegrante(event){
        console.log("Estoy eliminndo una persona");
        const user = Object.assign({}, {id:event.target.value});
        postUnAssignarMember(user)
            .then(response => {
                this.cargarPosiblesIntegrantes();
                this.cargarIntegrantes();
                console.log("El integrante se a eliminado satisfactoriamente");
            }).catch(error => {
            console.log('No se ha podido registrar la información');
        });
    }
    agregarIntegrante(event){
        console.log("Estoy agregando un untegrante al equipo");
        const user = Object.assign({}, {id:event.target.value});
        postAssignarMember(user)
            .then(response => {
                this.cargarPosiblesIntegrantes();
                this.cargarIntegrantes();
                console.log("El estudiante fue agregado como integrante");
            }).catch(error => {
            console.log('No se ha podido registrar la información');
        });
    }

    cargarData(){

        this.columnasIntegrantes=[
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
                name: 'ACCIONES',
                button: true,
                cell: row =>
                    <button style={{minWidth:"130px"}}
                         onClick={this.eliminarIntegrante}
                         value={row.idUser}
                         className="btn btn-primary btn-sm" rel="noopener noreferrer">
                        Eliminar
                    </button>
            }
        ];

        this.columnasNuevos=[
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
                name: 'ACCIONES',
                button: true,
                cell: row =>
                    <button style={{minWidth:"130px"}}
                            onClick={this.agregarIntegrante}
                            value={row.idUser}
                            className="btn btn-primary btn-sm" rel="noopener noreferrer">
                        Agregar
                    </button>
            }
        ];

        this.paginacionOpciones={
            rowsPerPageText: 'Filas por página',
            rangeSeparatorText:'de',
            selectAllRowsItem: true,
            selectAllRowsItemText: 'Todos'
        }
        this.cargarPosiblesIntegrantes();
        this.cargarIntegrantes();
    };

    render() {
        return(
            <div className="row">
                <div className="col-12 table-responsive text-center">
                    {
                        this.state.loadingIntegrante ? (
                            <LoadingInternal></LoadingInternal>
                        ) : (
                            <DataTable
                                columns={this.columnasIntegrantes}
                                data={this.state.integrantes}
                                pagination
                                paginationComponentOptions={this.paginacionOpciones}
                                fixedHeader
                            />)
                    }
                </div>
                <div className="col-12 margin-bottom">
                    <hr style={{width:"100%"}}/>
                </div>
                <div className="col-12 table-responsive text-center">
                    {
                        this.state.loadingNuevos?(
                            <LoadingInternal></LoadingInternal>
                        ):(
                        <DataTable
                            columns={this.columnasNuevos}
                            data={this.state.nuevos}
                            pagination
                            paginationComponentOptions={this.paginacionOpciones}
                            fixedHeader
                        />)
                    }
                </div>
                <Alert stack={{limit: 3}}
                       timeout = {3000}
                       position='top-right' effect='slide' offset={65} />
            </div>);
    }
} export default Integrantes;
