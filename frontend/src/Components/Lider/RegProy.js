import React, {Component, useState} from 'react';
import '../../Styles/Plantilla.css';
import {dataAutor, putProjectLeader} from "../../Util/ApiUtil";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Integrantes, {cargarIntegrantes} from "./Integrante";
import Alert from 'react-bootstrap/Alert'


class RegProy extends Component {
    constructor(props) {
        super(props);
        dataAutor([this.props.data]);
        this.state = {
            show: false,
            acronym: this.props.data.acronym,
            name: this.props.data.name,
            abstracts: this.props.data.abstracts,
            gitAddress: this.props.data.gitAddress,
            keywords: this.props.data.keywords,
            director: this.props.data.director,
            date: this.props.data.startDate,
            integrantes:this.props.data.autores,
            visibleOk: false,
            visibleNok: false,
            reqGit: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.eliminarIntegrante = this.eliminarIntegrante.bind(this);

    }

    eliminarIntegrante(event) {
        console.log("Estoy eliminndo una persona");
    }

    isGitUrl(str){
        const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
        return regex.test(str);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(" Si pasó por handle submit");
        const loginRequest = Object.assign({}, this.state);
        putProjectLeader(loginRequest)
            .then(response => {
                this.setState({
                    visibleOk: !this.state.visibleOk
                })
                setTimeout(() => {
                    this.setState({
                        visibleOk: !this.state.visibleOk
                    })
                }, 4000)

            }).catch(error => {
            this.setState({
                visibleNok: !this.state.visibleNok
            })
            setTimeout(() => {
                this.setState({
                    visibleNok: !this.state.visibleNok
                })
            }, 4000)
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
                            <Integrantes data={props.data}></Integrantes>
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
            <div>
                <h1>Gestión del proyecto</h1>

                <form onSubmit={this.handleSubmit} className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12">
                        <Modal
                            show={this.state.visibleOk}
                            onHide={() => this.setState({
                                visibleOk: !this.state.visibleOk
                            })}
                            backdrop="static"
                            keyboard={false}
                            size="mm"
                            centered
                        >
                            <Modal.Header>
                                <h5 className="modal-title" >Notificación Éxitosa</h5>
                            </Modal.Header>
                            <Modal.Body>
                                <h6>La actualización de datos del proyecto se ha realizado con éxito</h6>
                            </Modal.Body>

                        </Modal>

                        <Modal
                            show={this.state.visibleOk}
                            onHide={() => this.setState({
                                visibleOk: !this.state.visibleOk
                            })}
                            backdrop="static"
                            keyboard={false}
                            size="sm"
                            centered
                        >
                            <Alert effect='slide' offset={65} variant="danger" show={this.state.visibleNok} onClose={() => this.setState({
                                visibleNok: !this.state.visibleNok
                            })} >
                                Actualización fallida de datos
                            </Alert>
                        </Modal>


                    </div>

                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">Título del proyecto: </label>
                        <input type="text" className="form-control col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10"
                               id="titulo" value={this.state.name} placeholder="Título del proyecto"
                               onChange={(e) => {
                                   this.setState({name: e.target.value})
                               }} maxLength="249" required/>
                    </div>
                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                            <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">Acrónimo: </label>
                            <input type="text" className="form-control col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10"
                                   id="acronimo" value={this.state.acronym}
                                   placeholder="Sigla u Acrónimo" onChange={(e) => {
                                this.setState({acronym: e.target.value})
                            }} maxLength="49" required/>
                    </div>
                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12">
                            <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">Clasificación: </label>
                            <select id="inputClasificacion" defaultValue="proyecto_grado"
                                    className="form-control col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10"
                                    disabled>
                                <option value="proyecto_grado">Proyecto de grado</option>
                            </select>

                    </div>
                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">Mentor(es):</label>
                        <input type="text" className="form-control col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10"
                               id="monitores" value={this.state.director} placeholder="Director(es) / Codirector(es)"
                               onChange={(e) => {
                                   this.setState({director: e.target.value})
                               }} maxLength="99" required/>
                    </div>
                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">Palabras clave: </label>
                        <input type="text" className="form-control col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10"
                               id="palabraClave" value={this.state.keywords} placeholder="Palabras clave"
                               onChange={(e) => {
                                   this.setState({keywords: e.target.value})
                               }} maxLength="199" required/>
                    </div>
                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <label className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">Resumen del proyecto:</label>
                        <textarea className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" id="resumen" rows="5" value={this.state.abstracts}
                                  onChange={(e) => {
                                      this.setState({abstracts: e.target.value})
                                  }} maxLength="1000"/>
                    </div>

                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                            <label className=" col-12 col-sm-3 col-md-12 col-lg-12 col-xl-12">Integrantes: </label>
                            <textarea type="text"
                                   value={this.state.integrantes} rows="2"
                                   className="form-control col-12 col-sm-9 col-md-12 col-lg-12 col-xl-12" id="InputGestionInt"
                                   placeholder="Integrantes" readOnly/>
                    </div>
                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <label className="form-group col-5 col-sm-3 col-md-2 col-lg-2 col-xl-2">Fecha de registro:</label>
                        <input type="text" className="form-control col-7 col-sm-9 col-md-8 col-lg-6 col-xl-7" id="date" value={this.state.date}
                               disabled/>
                        <div className=" col-12 col-sm-6 col-md-2 col-lg-4 col-xl-3">
                            <Example  data={this.props.data.users}
                                      onAccion={this.eliminarIntegrante}></Example>
                        </div>
                    </div>

                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12">
                        <label className=" col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">URL del repositorio: </label>
                        <input type="text" className="form-control col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10 "
                               id="repositorio" value={this.state.gitAddress}
                               placeholder="URL de repositorio" onChange={(e) => {
                            this.setState({gitAddress: e.target.value})
                               }} maxLength="100" required={!this.isGitUrl(this.state.gitAddress)}/>
                        <Alert className="col-12 col-sm-12 col-md-12 col-lg-12" effect='slide' offset={65} variant="success"
                               show={this.isGitUrl(this.state.gitAddress)} >
                            Dirección GitHub válida
                        </Alert>
                        <Alert className="col-12 col-sm-12 col-md-12 col-lg-12" effect='slide' offset={65} variant="danger"
                               show={!this.isGitUrl(this.state.gitAddress)} >
                            Dirección GitHub inválida, el formato válido es : https://github.com/USUARIO/REPOSITORIO.git
                        </Alert>
                    </div>
                    <button type="submit" className="btn btn-primary col-sm-2">Guardar</button>
                </form>
            </div>
        );
    }
}

export default RegProy;
