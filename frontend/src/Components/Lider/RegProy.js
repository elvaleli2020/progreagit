import React, {Component, useState} from 'react';
import '../../Styles/Plantilla.css';
import {putProjectLeader} from "../../Util/ApiUtil";
import BuscaPersonas from "../Admin/BuscaPersonas";
import EliminaIntegrante from "./EliminaIntegrante";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Integrantes,{cargarIntegrantes} from "./Integrante";


class RegProy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            acronym: this.props.data.acronym,
            name: this.props.data.name ,
            abstracts: this.props.data.abstracts,
            gitAddress: this.props.data.gitAddress,
            keywords:this.props.data.keywords,
            director: this.props.data.director,
            date: this.props.data.startDate,
            integrantes: this.props.cargarIntegrantes
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.eliminarIntegrante= this.eliminarIntegrante.bind(this);

    }

    eliminarIntegrante(event){
        console.log("Estoy eliminndo una persona");
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(" Si pasó por handle submit");
        const loginRequest = Object.assign({}, this.state);
        putProjectLeader(loginRequest)
            .then(response => {
                alert("Proyecto Actualizado con éxito");
            }).catch(error => {
            alert('No se ha podido registrar la información');
        });
        // alert('La info que muestra' + JSON.stringify(this.state));
    }

    render() {
        function Example(props) {
            console.log(props);
            const [show, setShow] = useState(false);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);

            return (
                <div>
                    <Button variant="primary" onClick={handleShow}>
                        Gestion de Integrantes
                    </Button>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        size="xl"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Gestión de integrantes</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Integrantes data={props.data} ></Integrantes>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
        console.log(this.props.data.users);
        return (
            <div >
                <h1>Gestión del proyecto</h1>
                <form  onSubmit={this.handleSubmit} className="col-sm-12">
                    <div className="form-group row col-sm-12">
                        <label className="col-5 col-sm-3 col-md-2 col-lg-2 col-xl-1">Título del proyecto: </label>
                        <input type="text" className="form-control col-7 col-sm-9 col-md-10 col-lg-10 col-xl-11 " id="titulo" value={this.state.name} placeholder="Título del proyecto"
                               onChange={(e)=>{this.setState({name: e.target.value})}} required/>
                    </div>
                    <div className=" form-group row col-sm-12">
                        <div className=" form-inline col-sm-7">
                            <label className="col-5 col-sm-3 col-md-2 col-lg-2 col-xl-1">Acrónimo: </label>
                            <input type="text" className="form-control col-7 col-sm-9 col-md-10 col-lg-10 col-xl-11" id="acronimo" value={this.state.acronym}
                                   placeholder="Sigla u Acrónimo" onChange={(e)=>{this.setState({acronym: e.target.value})}} required/>
                         </div>
                        <div className=" form-inline col-sm-5 " >
                            <label className="col-5 col-sm-4 col-md-3 col-lg-3 col-xl-2">Clasificación: </label>
                            <select id="inputClasificacion" defaultValue="proyecto_grado" className="form-control col-7 col-sm-8 col-md-9 col-lg-9 col-xl-10"
                                    disabled>
                                <option value="proyecto_grado">Proyecto de grado</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group row col-sm-12">
                        <label className="col-5 col-sm-3 col-md-2 col-lg-2 col-xl-1">Mentor(es)</label>
                        <input type="text" className="form-control col-7 col-sm-9 col-md-10 col-lg-10 col-xl-11"
                               id="monitores" value={this.state.director} placeholder="Director(es) / Codirector(es)"
                               onChange={(e)=>{this.setState({director: e.target.value})}} required/>
                    </div>
                    <div className="form-group row col-sm-12">
                        <label className="col-5 col-sm-3 col-md-2 col-lg-2 col-xl-1">Palabras clave: </label>
                        <input type="text" className="form-control col-7 col-sm-9 col-md-10 col-lg-10 col-xl-11"
                               id="palabraClave" value={this.state.keywords} placeholder="Palabras clave"
                               onChange={(e)=>{this.setState({keywords: e.target.value})}}  required/>
                    </div>
                    <div className="form-group row col-sm-12">
                        <label className="col-sm-12">Resumen del proyecto:</label>
                        <textarea className="form-control col-sm-12" id="resumen" rows="5" value={this.state.abstracts}
                                  onChange={(e)=>{this.setState({abstracts: e.target.value})}}/>
                    </div>
                    <div className="form-group row col-sm-12">
                        <div className=" form-inline col-sm-3">
                            <label className="form-group col-sm-6">Fecha de registro:</label>
                            <input type="text" className="form-control col-sm-6" id="date" value={this.state.date}
                                   disabled/>
                        </div>
                        <div className="form-inline col-sm-9">
                            <label className=" col-sm-2">Integrantes: </label>
                            <input type="text" className="form-control col-sm-7" id="InputGestionInt"
                                   placeholder="Integrantes" />
                            <Example className="col-sm-2" data={this.props.data.users} onAccion={this.eliminarIntegrante}></Example>
                        </div>

                    </div>
                    <br/>
                    <div className="form-group row col-sm-12">
                        <label className=" col-5 col-sm-3 col-md-2 col-lg-2 col-xl-1">Integrantes: </label>
                        <input type="text" className="form-control col-7 col-sm-9 col-md-10 col-lg-10 col-xl-11 " id="repositorio" value={this.state.gitAddress}
                               placeholder="URL de repositorio" onChange={(e)=>{this.setState({gitAddress: e.target.value})}}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary col-sm-2">Guardar</button>
                </form>
            </div>
        );
    }
}

export default RegProy;
