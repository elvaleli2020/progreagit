import React, {Component} from 'react';
import '../../Styles/Plantilla.css';

class RegProy extends Component {
    render() {
        return (
            <div >
                <h1>Registro de Proyectos</h1>
                <form className="col-sm-12">
                    <div className="form-group">
                        <input type="text" className="form-control" id="InputTitle" placeholder="Título del proyecto"/>
                    </div>
                    <div className="row">
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="InputShortName"
                                   placeholder="Sigla u Acrónimo"/>
                         </div>
                        <div className="col-sm-3">
                            <select id="inputClasificacion" className="form-control" disabled>
                                <option selected>Proyecto de grado</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="text" className="form-control" id="InputDir"
                               placeholder="Director(es) / Codirector(es)"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="InputKeywords"
                               placeholder="Palabras clave"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtAreaResum">Resumen del proyecto:</label>
                        <textarea className="form-control" id="txtAreaResum" rows="5"></textarea>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="InputDateDesde"
                                   placeholder="Fecha de registro: (DD/MM/YYYY)" disabled/>
                        </div>
                        <div className="col-sm-1">
                            <input type="text" className="form-control" id="InputDateHasta"
                                   placeholder="Año"/>
                        </div>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="InputGestionInt"
                                   placeholder="Integrantes:"/>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn-primary">Gestionar Integrantes</button>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="text" className="form-control" id="InputURL"
                               placeholder="URL de repositorio"/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
            </div>
        );
    }
}

export default RegProy;