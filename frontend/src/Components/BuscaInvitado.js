import React, {Component} from 'react';
import '../Styles/Plantilla.css';

class BuscaInvitado extends Component {

    render() {
        return (
            <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-2 ">

                        <select id="inputInvitado" className="form-control">
                            <option selected>Estudiante</option>
                            <option>Título</option>
                            <option>Año</option>
                        </select>
                    </div>
                    <div className="col-sm-7 col-md-7 col-lg-7 ">
                        <label htmlFor="inputPassword2" className="sr-only"></label>
                        <input type="text" className="form-control" id="buscarInvitado"/>
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <button type="submit" className="btn btn-primary mb-2">Buscar</button>
                    </div>
                </div>
            </div>
        );

    }

}

export default BuscaInvitado;