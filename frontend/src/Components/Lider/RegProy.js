import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import {putProjectLeader} from "../../Util/ApiUtil";

class RegProy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idProject: "1",
            acronym: "",
            name: "",
            abstracts: "",
            gitAddress: "",
            keywords:"",
            director: "",
            date: new Date().toLocaleString()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(" Si pasó por handle submit");
        const loginRequest = Object.assign({}, this.state);
        putProjectLeader(loginRequest)
            .then(response => {
                alert(response);
            }).catch(error => {
            alert('Entró por el catch error');
        });
        alert('La info que muestra' + JSON.stringify(this.state));
    }

    render() {
        return (
            <div >
                <h1>Registro de Proyectos</h1>
                <form className="col-sm-12">
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
                            <select id="inputClasificacion" value="Proyecto de grado" className="form-control" disabled>
                                <option selected>Proyecto de grado</option>
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
                            <button className="btn-primary">Gestionar Integrantes</button>
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