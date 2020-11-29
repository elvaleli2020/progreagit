import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import TableAdmin from "./TableAdmin";
import {dataAutor, getSearchProject} from "../../Util/ApiUtil";
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
                this.loading=false;
                dataAutor(response);
                this.setState({
                    data: response
                });
        }).catch(error => {
            this.loading= false;
        });
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title"><strong>Búsqueda Avanzada</strong></h4>
                </div>
                <div className="card-body">
                    <form onSubmit={this.serviceSearch} className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-sm-right" autoComplete="off">
                        <div className="form-group row">
                            <label className="col-5 col-sm-3 col-md-2 col-lg-3 col-xl-2 ">Titulo del proyecto: </label>
                            <input type="text" className="col-7 col-sm-9 col-md-10 col-lg-9 col-xl-10 form-control" id="name"
                                   value={this.state.name}
                                   onChange={this.handleInputChange}
                                   placeholder=" Por favor, inserte el título del proyecto"/>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 col-sm-3 col-md-2 col-lg-3 col-xl-2">Autores: </label>
                            <input type="text" className="form-control col-7 col-sm-9 col-md-10 col-lg-9 col-xl-10 " id="autor"
                                   value={this.state.autor}
                                   onChange={this.handleInputChange}
                                   placeholder=" Por favor, inserte autor(es) relacionados con el proyecto"/>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 col-sm-3 col-md-2 col-lg-3 col-xl-2">Palabras claves: </label>
                            <input type="text" className="col-7  col-sm-9 col-md-10 col-lg-9 col-xl-10 form-control" id="keywords"
                                   value={this.state.keywords}
                                   onChange={this.handleInputChange}
                                   placeholder=" Por favor, inserte palabras claves del proyecto"/>
                        </div>
                        <div className="form-group row">
                                <label className="col-5 col-sm-3 col-md-2 col-lg-3 col-xl-3">Seleccione estado: </label>
                                <select className="form-control col-7 col-sm-9 col-md-4 col-lg-3 col-xl-3" id="estado" defaultValue={this.state.estado}
                                        onChange={this.handleInputChange} >
                                    <option>Ninguno</option>
                                    <option value="aceptada">Aceptada</option>
                                    <option value="rechazada">Rechazada</option>
                                    <option value="aceptada_con_corecciones">Aceptada con correcciones</option>
                                </select>

                                <label className="col-5 col-sm-3 col-md-2 col-lg-3 col-xl-3">Seleccione calificación:</label>
                                <select className="form-control col-7 col-sm-9 col-md-4 col-lg-3 col-xl-3" id="qualification"
                                        defaultValue={this.state.qualification}
                                        onChange={this.handleInputChange}>
                                    <option>Ninguna</option>
                                    <option value="aprobada">Aprobada</option>
                                    <option value="reprobadad">Reprobada</option>
                                    <option value="laureada">Laureada</option>
                                    <option value="meritoria">Meritoria</option>
                                </select>
                                <br/>
                                <label htmlFor="dateInit" className="col-5 col-sm-3 col-md-2 col-lg-3 col-xl-3">Fecha desde:</label>
                                <input type="date" className="form-control col-7 col-sm-3 col-md-4 col-lg-3 col-xl-3" id="dateInit"
                                       value={this.state.dateInit}
                                       onChange={this.handleInputChange}/>

                                <label htmlFor="dateInit" className="col-5 col-sm-3 col-md-2 col-lg-3 col-xl-3">Fecha hasta:</label>
                                <input type="date" className="form-control col-7 col-sm-3 col-md-4 col-lg-3 col-xl-3" id="dateLimit"
                                       value={this.state.dateLimit}
                                       onChange={this.handleInputChange}/>

                        </div>
                        <div className="form-group row">
                            <label className="col-5 col-sm-3 col-md-2 col-lg-3 col-xl-2">Mentor(es): </label>
                            <input type="text" className="col-7  col-sm-9 col-md-10 col-lg-9 col-xl-10 form-control" id="InputDir"
                                   placeholder=" Por favor, inserte Director(es) / Codirector(es)"/>
                        </div>
                        <button type="submit" className=" form-group row btn btn-primary col-6 col-sm-4 col-md-3 col-lg-2 col-lg-2 col-xl-2">Buscar</button>
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
