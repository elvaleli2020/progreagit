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
            data:[],
            loading:true,
            busqueda:"nombre",
            valueBusqueda:null,
            name:null,
            autor:null,
            keywords:null,
            mentor:null
        }
        this.loading = true;
        this.serviceSearch(null);
        this.serviceSearch = this.serviceSearch.bind(this);
        this.handleInputChange = handleInputChange.bind(this);
    }


    serviceSearch(event){
        if(event!=null)
            event.preventDefault();
        this.state.name=null;
        this.state.autor=null;
        this.state.keywords=null;
        this.state.mentor=null;

        if(this.state.valueBusqueda!=null || this.state.valuebusqueda!=""){
            if(this.state.busqueda=="nombre") {
                this.state.name = this.state.valueBusqueda;
            }else if(this.state.busqueda=="autor") {
                this.state.autor=this.state.valueBusqueda;
            }else if(this.state.busqueda=="keywords"){
                this.state.keywords=this.state.valueBusqueda;
            }else{
                this.state.mentor=this.state.valueBusqueda;
            }
        }
        this.setState({
            loading:true
        });
        console.log(",",this.state)
        const search = Object.assign({}, this.state);
        this.setState({
            loading:true});
        getSearchProject(search)
            .then(response => {
                console.log("Se genero el servico")
                dataAutor(response);
                this.setState({
                    data: response,
                    loading:false
                });
        }).catch(error => {
            this.setState({
                data:[],
                loading:false
            });
        });
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title"><strong>Búsqueda Avanzada</strong></h4>
                </div>
                <div className="card-body">
                    <form onSubmit={this.serviceSearch} className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 form-group row " autoComplete="off">

                        <div className="form-group row col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-6 ">Búsqueda por: </label>
                            <select id="busqueda"
                                    defaultValue={this.state.busqueda}
                                    onChange={this.handleInputChange} className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-6 form-control">
                                <option value="nombre">Titulo</option>
                                <option value="autor">Autor</option>
                                <option value="keywords">Palabras claves</option>
                                <option value="mentor">Mentor/director</option>
                            </select>
                        </div>
                        <div className="form-group row col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <input type="text" className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 form-control" id="valueBusqueda"
                                   value={this.state.valueBusqueda}
                                   onChange={this.handleInputChange}
                                   placeholder="Busqueda"/>
                        </div>
                        <div className="form-group row col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-6">Seleccione estado: </label>
                                <select className="form-control col-7 col-sm-7 col-md-7 col-lg-7 col-xl-6" id="estado"
                                        defaultValue={this.state.estado}
                                        onChange={this.handleInputChange} >
                                    <option>Ninguno</option>
                                    <option value="aceptada">Aceptada</option>
                                    <option value="rechazada">Rechazada</option>
                                    <option value="aceptada_con_corecciones">Aceptada con correcciones</option>
                                </select>
                        </div>
                        <div className="form-group row  col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-6">Seleccione calificación:</label>
                                <select className="form-control col-7 col-sm-7 col-md-7 col-lg-7 col-xl-6" id="qualification"
                                        defaultValue={this.state.qualification}
                                        onChange={this.handleInputChange}>
                                    <option>Ninguna</option>
                                    <option value="aprobada">Aprobada</option>
                                    <option value="reprobadad">Reprobada</option>
                                    <option value="laureada">Laureada</option>
                                    <option value="meritoria">Meritoria</option>
                                </select>
                        </div>
                        <div className="form-group row col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="dateInit" className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-6">Fecha desde:</label>
                                <input type="date" className="form-control col-7 col-sm-7 col-md-7 col-lg-7 col-xl-6" id="dateInit"
                                       value={this.state.dateInit}
                                       onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group row col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="dateInit" className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-6">Fecha hasta:</label>
                                <input type="date" className="form-control col-7 col-sm-7 col-md-7 col-lg-7 col-xl-6" id="dateLimit"
                                       value={this.state.dateLimit}
                                       onChange={this.handleInputChange}/>

                        </div>
                        <div className="form-group row justify-content-center col-12 col-sm-12 col-md-12 col-lg-12">
                            <button type="submit" className=" form-control btn btn-primary col-12 col-sm-8 col-md-3 col-lg-2 col-lg-2 col-xl-2">Buscar</button>
                        </div>
                    </form>
                </div>
                <br/>
               <div>
                   {
                       this.state.loading?(
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
