import React, {Component} from 'react';

class MostrarMasProyecto extends Component {
    constructor(props) {
        super(props);
        console.log("mostrar proyectos: ",this.props);
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
                        <input className="col-sm-2 form-control" value={this.props.data.projectStatus} readOnly/>

                        <label className="col-sm-2 col-lg-2 text-right">Calificación:</label>
                        <input className="col-sm-2 form-control" value={this.props.data.qualification} readOnly/>

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
                    <div className="form-group row align-content-center col-sm-12">
                            <button className="btn btn-primary  col-sm-2"  >
                                <a href={this.cleanURL()}>Descargar Proyecto </a> </button>
                    </div>

                </div>
            </div>

        )
    };

}
export default MostrarMasProyecto;
