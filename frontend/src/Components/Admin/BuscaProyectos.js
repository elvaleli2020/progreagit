import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import TableAdmin from "./TableAdmin";

class BuscaProyectos extends Component {
    render() {
        return (
            <div>
                <div >
                    <h1>Búsqueda Avanzada</h1>
                    <form className="col-sm-12">
                        <div className="form-group">
                            <input type="text" className="form-control" id="InputTitle" placeholder="Título del proyecto"/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="InputAutores" placeholder="Autor(es)"/>
                        </div>
                        <div className="row">
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="InputKeywords"
                                       placeholder="Palabras clave"/>
                            </div>
                            <div className="col-sm-3">
                                <select id="inputEstado" className="form-control">
                                    <option selected>Seleccione Estado:</option>
                                    <option>Aceptada</option>
                                    <option>Rechazada</option>
                                    <option>Aceptada con correcciones</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-sm">
                                <input type="text" className="form-control" id="InputDateDesde"
                                       placeholder="Fecha desde: (DD/MM/YYYY)"/>
                            </div>
                            <div className="col-sm">
                                <input type="text" className="form-control" id="InputDateHasta"
                                       placeholder="Fecha hasta: (DD/MM/YYYY)"/>
                            </div>
                            <div className="col-sm">
                                <select id="inputCalificacion" className="form-control">
                                    <option selected>Seleccione Calificación:</option>
                                    <option>Aprobada</option>
                                    <option>Reprobada</option>
                                    <option>Laureada</option>
                                    <option>Meritoria</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="text" className="form-control" id="InputDir"
                                   placeholder="Director(es) / Codirector(es)"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </form>
                </div>
                <br/>
               <div>
                <TableAdmin></TableAdmin>
               </div>
            </div>
        );
    }
}

export default BuscaProyectos;