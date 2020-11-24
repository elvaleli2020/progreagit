import React, {Component, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Integrantes from "./Integrante";
import BuscaPersonas from "../Admin/BuscaPersonas";

class ModalIntegrantes extends Component{

    constructor(props) {
        super(props);
        this.setShow = useState(false);
        this.handleClose = () => this.setShow(false);
        this.handleShow = () => this.setShow(true);
    }
    render(){
        console.log(this.props);
        const [show, setShow] = useState(false);

        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Gestion de Integrantes
                </Button>

                <Modal
                    show={show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="xl"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Gestión de integrantes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Integrantes data={this.props.incluidos}></Integrantes>
                        <br/>
                        <BuscaPersonas></BuscaPersonas>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary">Registrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default ModalIntegrantes;
