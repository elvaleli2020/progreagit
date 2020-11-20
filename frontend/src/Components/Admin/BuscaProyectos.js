import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import TableAdmin from "./TableAdmin";
import {getSearchProject} from "../../Util/ApiUtil";
import {handleInputChange} from "../../Util/FormUtil";
import LoadingInternal from "../Plantilla/LoadingInternal";

class BuscaProyectos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
        this.loading = true;
        this.serviceSearch(this);
        this.serviceSearch = this.serviceSearch.bind(this);
        this.handleInputChange = handleInputChange.bind(this);
    }
    serviceSearch(event){
        if(!event)
            event.preventDefault();
        const search = Object.assign({}, this.state);
        this.loading = true;
        getSearchProject(search)
            .then(response => {
                console.log(response);
                this.loading=false;
                this.setState({
                    data: response
                });
        }).catch(error => {
            this.loading= false;
            console.log(error);
        });
    }
    render() {
        console.log(this.state);
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title"><strong>Búsqueda Avanzada</strong></h4>
                </div>
                <div className="card-body">
                    <form onSubmit={this.serviceSearch} className="col-sm-12 text-sm-right" autocomplete="off">
                        <div className="form-group row">
                            <label className="col-sm-1 col-lg-1">Titulo del proyecto: </label>
                            <input type="text" className="col-sm-11 col-lg-11 form-control" id="name"
                                   value={this.state.name}
                                   onChange={this.handleInputChange}
                                   placeholder=" Por favor, inserte el título del proyecto"/>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-1 col-lg-1">Autores: </label>
                            <input type="text" className="form-control col-sm-11 col-lg-11" id="autor"
                                   value={this.state.autor}
                                   onChange={this.handleInputChange}
                                   placeholder=" Por favor, inserte autor(es) relacionados con el proyecto"/>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-1 col-lg-1">Palabras claves: </label>
                            <input type="text" className="col-sm-11 col-lg-11 form-control" id="keywords"
                                   value={this.state.keywords}
                                   onChange={this.handleInputChange}
                                   placeholder=" Por favor, inserte palabras claves del proyecto"/>
                        </div>
                        <div className="form-group row">
                                <label className="col-sm-1 col-lg-1">Seleccione estado: </label>
                                <select className="form-control col-sm-2 " id="estado" value={this.state.estado}
                                        onChange={this.handleInputChange} >
                                    <option selected>Ninguno</option>
                                    <option value="aceptada">Aceptada</option>
                                    <option value="rechazada">Rechazada</option>
                                    <option value="aceptada_con_corecciones">Aceptada con correcciones</option>
                                </select>

                                <label className="col-sm-1 col-lg-1">Seleccione calificación:</label>
                                <select className="form-control col-sm-2 " id="qualification"
                                        value={this.state.qualification}
                                        onChange={this.handleInputChange}>
                                    <option selected>Ninguna</option>
                                    <option value="aprobada">Aprobada</option>
                                    <option value="reprobadad">Reprobada</option>
                                    <option value="laureada">Laureada</option>
                                    <option value="meritoria">Meritoria</option>
                                </select>

                                <label htmlFor="dateInit" className="col-sm-1 col-lg-1">Fecha desde:</label>
                                <input type="date" className="form-control col-sm-2 " id="dateInit"
                                       value={this.state.dateInit}
                                       onChange={this.handleInputChange}/>

                                <label htmlFor="dateInit" className="col-sm-1 col-lg-1">Fecha hasta:</label>
                                <input type="date" className="form-control col-sm-2" id="dateLimit"
                                       value={this.state.dateLimit}
                                       onChange={this.handleInputChange}/>

                        </div>
                        <div className="form-group row">
                            <label className="col-sm-1 col-lg-1">Mentor(es): </label>
                            <input type="text" className="col-sm-11 col-lg-11 form-control" id="InputDir"
                                   placeholder=" Por favor, inserte Director(es) / Codirector(es)"/>
                        </div>
                        <button type="submit" className=" form-group row btn btn-primary col-sm-2 col-lg-2">Buscar</button>
                    </form>
                </div>
                <br/>
               <div>
                   {
                       this.loading?(
                           <LoadingInternal></LoadingInternal>
                       ):(
                           <TableAdmin data={this.state.data}></TableAdmin>
                       )
                   }
               </div>
            </div>
        );
    }
}

export default BuscaProyectos;
