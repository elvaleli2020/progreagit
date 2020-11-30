import React, {Component} from 'react';
import {dataAutor, getSearchProject, putCalificacion} from "../../Util/ApiUtil";
import {handleInputChange} from "../../Util/FormUtil";
import {Alert} from "react-bootstrap";

class MostrarMasProyecto extends Component {
    constructor(props) {
        super(props);
        this.state={
            idProject:this.props.data.idProject,
            qualification:this.props.data.qualification,
            projectStatus: this.props.data.projectStatus,
            visibleOk: false,
            visibleNok: false
        }
        console.log("mostrar proyectos: ",this.props);
        this.accionCalificacion = this.accionCalificacion.bind(this);
        this.handleInputChange = handleInputChange.bind(this);
    }

    accionCalificacion(event){
        event.preventDefault();
        const nota = Object.assign({}, this.state);
        putCalificacion(nota)
            .then(response => {
                console.log("Se genero la calificación")
                dataAutor(response);
                this.setState({
                    data: response,
                    loading:false,
                    visibleOk: !this.state.visibleOk
                });
                setTimeout(() => {
                    this.setState({
                        visibleOk: !this.state.visibleOk
                    })
                }, 4000)
            }).catch(error => {
            this.setState({
                data:[],
                loading:false,
                visibleNok: !this.state.visibleNok
            });
            setTimeout(() => {
                this.setState({
                    visibleNok: !this.state.visibleNok
                })
            }, 4000)
        });
    }
    removePrefix(prefix,s) {
        return s.substr(prefix.length);
    }
    cleanURL(){
        const url="https://github.com/";
        const page=this.removePrefix(url,this.props.data.gitAddress);
        const link= page.slice(0,-4);
        const united = "https://api.github.com/repos/"+link+"/zipball/";
        return united;
    }

    
    render(){
        console.log(this.cleanURL());
        return (
            <div className="card">
                <div className="card-body text-left">
                    <div className="form-group row">
                        <label className="col-sm-2 col-lg-2 text-right">Titulo del proyecto: </label>
                        <input className="col-sm-10 col-lg-10 form-control" value={this.props.data.name} readOnly />
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-lg-2 text-right">Autores: </label>
                        <input className="col-sm-10 col-lg-10 form-control" value={this.props.data.autores} readOnly/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-lg-2 text-right">Estado: </label>
                        <select className="col-sm-2 form-control"
                                id="projectStatus"
                                defaultValue={this.state.projectStatus}
                                onChange={this.handleInputChange}>
                            <option>Ninguno</option>
                            <option value="aceptada">Aceptada</option>
                            <option value="rechazada">Rechazada</option>
                            <option value="aceptada_con_corecciones">Aceptada con correcciones</option>
                        </select>

                        <label className="col-sm-2 col-lg-2 text-right">Calificación:</label>
                        <select className="col-sm-2 form-control"
                                id="qualification"
                                defaultValue={this.state.qualification}
                                onChange={this.handleInputChange}>
                            <option>Ninguna</option>
                            <option value="aprobada">Aprobada</option>
                            <option value="reprobadad">Reprobada</option>
                            <option value="laureada">Laureada</option>
                            <option value="meritoria">Meritoria</option>
                        </select>

                        <label className="col-sm-1 col-lg-1 text-right">Fecha desde:</label>
                        <input className="col-sm-1 form-control" value={this.props.data.startDate} readOnly/>

                        <label className="col-sm-1 col-lg-1 text-right">Fecha hasta:</label>
                        <input className="col-sm-1 form-control" value={this.props.data.endDate} readOnly/>

                    </div>
                    <div className="form-group row">
                            <label className="col-sm-2 col-lg-2 text-right">Mentor(es): </label>
                            <input className="col-sm-10 col-lg-10 form-control" value={this.props.data.director} readOnly/>
                    </div>
                    <div className="form-group row">
                            <label className="col-sm-2 col-lg-2 text-right">Repositorio:</label>
                            <input className="col-sm-10 col-lg-10 form-control" value={this.props.data.gitAddress}  readOnly/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-lg-2 text-right">Repositorio clon: </label>
                        <input className="col-sm-10 col-lg-10 form-control"  readOnly />
                    </div>
                    <div className="form-inline  col-sm-12">
                            <button className="btn btn-primary col-sm-2"  >
                                <a href={this.cleanURL()}>Descargar Proyecto </a> </button>
                            <button onClick={this.accionCalificacion} className="btn btn-primary col-sm-2"> Calificar</button>
                    </div>
                    <div className="form-group row col-12 col-sm-12 col-md-12 col-lg-12">
                        <Alert className="col-12 col-sm-12 col-md-12 col-lg-12" effect='slide' offset={65} variant="success" show={this.state.visibleOk} onClose={() => this.setState({
                            visibleOk: !this.state.visibleOk
                        })} dismissible>
                            Calificación registrada!
                        </Alert>
                        <Alert className="col-12 col-sm-12 col-md-12 col-lg-12" effect='slide' offset={65} variant="danger" show={this.state.visibleNok} onClose={() => this.setState({
                            visibleNok: !this.state.visibleNok
                        })} dismissible>
                            Calificación no regisrtrada
                        </Alert>
                    </div>

                </div>
            </div>

        )
    };

}
export default MostrarMasProyecto;
