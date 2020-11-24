import React, {Component, useState} from 'react';
import '../../Styles/Plantilla.css';
import {putProjectLeader} from "../../Util/ApiUtil";
import BuscaPersonas from "../Admin/BuscaPersonas";
import EliminaIntegrante from "./EliminaIntegrante";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Integrantes from "./Integrante";



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
            date: this.props.data.startDate
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
                            {/*<br/>*/}
                            {/*<BuscaPersonas></BuscaPersonas>*/}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button variant="primary">Registrar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
        console.log(this.props.data.users);
        return (
            <div >
                <h1>Registro de Proyectos</h1>
                <form  onSubmit={this.handleSubmit} className="col-sm-12">
                    <div className="form-group">
                        <input type="text" className="form-control" id="titulo" value={this.state.name} placeholder="Título del proyecto"
                               onChange={(e)=>{this.setState({name: e.target.value})}} required/>
                    </div>
                    <div className="row">
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="acronimo" value={this.state.acronym}
                                   placeholder="Sigla u Acrónimo" onChange={(e)=>{this.setState({acronym: e.target.value})}} required/>
                         </div>
                        <div className="col-sm-3">
                            <select id="inputClasificacion" defaultValue="proyecto_grado" className="form-control" disabled>
                                <option value="proyecto_grado">Proyecto de grado</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="text" className="form-control" id="monitores" value={this.state.director}
                               placeholder="Director(es) / Codirector(es)" onChange={(e)=>{this.setState({director: e.target.value})}} required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="palabraClave" value={this.state.keywords}
                               onChange={(e)=>{this.setState({keywords: e.target.value})}} placeholder="Palabras clave" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtAreaResum">Resumen del proyecto:</label>
                        <textarea className="form-control" id="resumen" rows="5" value={this.state.abstracts}
                                  onChange={(e)=>{this.setState({abstracts: e.target.value})}}/>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="date" value={this.state.date}
                                    disabled/>
                        </div>
                        <div className="col-sm-1">
                            <input type="text" className="form-control" id="InputDateHasta"
                                   placeholder="Año" required/>
                        </div>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="InputGestionInt"
                                   placeholder="Integrantes:"/>
                        </div>
                        <div className="col-sm-2">
                            <Example data={this.props.data.users} onAccion={this.eliminarIntegrante}></Example>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="text" className="form-control" id="repositorio" value={this.state.gitAddress}
                               placeholder="URL de repositorio" onChange={(e)=>{this.setState({gitAddress: e.target.value})}}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
            </div>
        );
    }
}

export default RegProy;
