import React, {Component} from 'react';

class MostrarMasProyecto extends Component {
    constructor(props) {
        super(props);
        console.log("mostrar proyectos: ",this.props);
    }

    
    render(){
        return (
            <div className="card">
                <div className="card-body text-left">
                    <div className="form-group row">
                        <label className="col-sm-2 col-lg-2 text-right">Titulo del proyecto: </label>
                        <div className="col-sm-10 col-lg-10 ">{this.props.data.name}</div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-lg-2 text-right">Autores: </label>
                        <div className="col-sm-10 col-lg-10">{this.props.data.autores}</div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-lg-2 text-right">Estado: </label>
                        <div className="col-sm-1">{this.props.data.projectStatus}</div>

                        <label className="col-sm-2 col-lg-2 text-right">Calificación:</label>
                        <div className="col-sm-2">{this.props.data.qualification}</div>

                        <label className="col-sm-1 col-lg-1 text-right">Fecha desde:</label>
                        <div className="col-sm-1">{this.props.data.startDate}</div>

                        <label className="col-sm-1 col-lg-1 text-right">Fecha hasta:</label>
                        <div className="col-sm-1">{this.props.data.endDate}</div>

                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-lg-2 text-right">Mentor(es): </label>
                        <div className="col-sm-10 col-lg-10">{this.props.data.director}</div>
                    </div>
                </div>
            </div>

        )
    };

}
export default MostrarMasProyecto;
