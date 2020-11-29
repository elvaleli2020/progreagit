import React, {Component} from 'react';

class MostrarMasIntegrante extends Component {
    constructor(props) {
        super(props);
        console.log("mostrar integrantes: ", this.props);
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="form-group row">
                            <label className="col-sm-2 col-lg-2 text-right">Nombre: </label>
                            <input className="col-sm-4 col-lg-4 form-control" value={this.props.data.name} readOnly/>
                            <label className="col-sm-2 col-lg-2 text-right">Código: </label>
                            <input className="col-sm-4 col-lg-4 form-control" value={this.props.data.code} readOnly/>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-lg-2 text-right">Correo Institucional: </label>
                            <input className="col-sm-4 col-lg-4 form-control" value={this.props.data.email}readOnly/>
                            <label className="col-sm-2 col-lg-2 text-right">Correo Personal: </label>
                            <input className="col-sm-4 col-lg-4 form-control" value={this.props.data.personalEmail} readOnly/>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-lg-2 text-right">Teléfono: </label>
                            <input className="col-sm-4 col-lg-4 form-control" value={this.props.data.cellphone} readOnly/>
                            <label className="col-sm-2 col-lg-2 text-right">Dirección: </label>
                            <input className="col-sm-4 col-lg-4 form-control" value={this.props.data.address}readOnly/>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-lg-2 text-right">Red Social: </label>
                            <input className="col-sm-4 col-lg-4 form-control" readOnly/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default MostrarMasIntegrante;