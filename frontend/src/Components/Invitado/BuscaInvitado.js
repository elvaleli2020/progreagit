import React, {Component} from 'react';
import '../../Styles/Plantilla.css';

class BuscaInvitado extends Component {

    render() {
        return (
            <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="form-group row">
                    <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 form-inline">
                        <label htmlFor="inputInvitado" className="col-12 col-sm-2 col-md-3 col-lg-3 col-xl-3">Buscar por: </label>
                        <select id="inputInvitado" className=" form-control col-12 col-sm-10 col-md-9 col-lg-9 col-xl-9">
                            <option selected>Estudiante</option>
                            <option>Título</option>
                            <option>Año</option>
                        </select>
                    </div>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-8">
                        <input type="text" className="form-control col-12 col-sm-12 col-md-12" placeholder="Digite su búsqueda" id="buscarInvitado"/>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-1">
                        <button type="submit" className="btn btn-primary col-12 col-sm-6 col-md-6 col-lg-2 col-xl-12">Buscar</button>
                    </div>
                    <br/>
                </div>
            </div>
        );

    }

}

export default BuscaInvitado;