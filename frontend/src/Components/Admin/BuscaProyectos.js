import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import TableAdmin from "./TableAdmin";
import {getSearchProject} from "../../Util/ApiUtil";
import {handleInputChange} from "../../Util/FormUtil";

class BuscaProyectos extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.data=null;
        this.serviceSeach = this.serviceSearch.bind(this);
        this.handleInputChange = handleInputChange.bind(this);
    }
    serviceSearch(event){
        event.preventDefault();
        console.log("Entre al search");
        const search = Object.assign({}, this.state);


        getSearchProject(search)
            .then(response => {
                console.log(response);
                this.data = response;
        }).catch(error => {
            console.log(error);
        });
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <div>
                    <h1>Búsqueda Avanzada</h1>
                    <form onSubmit={this.serviceSeach} className="col-sm-12 text-sm-right" autocomplete="off">
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-3">Titulo del proyecto: </label>
                            <input type="text" className="col-sm-8 col-lg-8 form-control" id="name"
                                   value={this.state.name}
                                   onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-3">Autores: </label>
                            <input type="text" className="form-control col-sm-8 col-lg-8" id="autor"
                                   value={this.state.autor}
                                   onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-3">Palabras claves: </label>

                            <input type="text" className="col-sm-8 col-lg-8 form-control" id="keywords"
                                   value={this.state.keywords}
                                   onChange={this.handleInputChange}/>

                            <select id="estado" value={this.state.estado}
                                    onChange={this.handleInputChange} className="form-control col-sm-3">
                                <option selected>Seleccione Estado:</option>
                                <option value="aceptada">Aceptada</option>
                                <option value="rechazada">Rechazada</option>
                                <option value="aceptada_con_corecciones">Aceptada con correcciones</option>
                            </select>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-sm">
                                <input type="date" className="form-control" id="dateInit"
                                       value={this.state.dateInit}
                                       onChange={this.handleInputChange}
                                       placeholder="Fecha desde: (DD/MM/YYYY)"/>
                            </div>
                            <div className="col-sm">
                                <input type="date" className="form-control" id="dateLimit"
                                       value={this.state.dateLimit}
                                       onChange={this.handleInputChange}
                                       placeholder="Fecha hasta: (DD/MM/YYYY)"/>
                            </div>
                            <div className="col-sm">
                                <select id="qualification"
                                        value={this.state.qualification}
                                        onChange={this.handleInputChange} className="form-control">
                                    <option selected>Seleccione Calificación:</option>
                                    <option value="aprobada">Aprobada</option>
                                    <option value="reprobadad">Reprobada</option>
                                    <option value="laureada">Laureada</option>
                                    <option value="meritoria">Meritoria</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="text" className="form-control" id="InputDir"
                                   placeholder="Director(es) / Codirector(es)"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </form>
                </div>
                <br/>
               <div>
                <TableAdmin></TableAdmin>
               </div>
            </div>
        );
    }
}

export default BuscaProyectos;
