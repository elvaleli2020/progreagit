import React, {Component} from 'react'

class EliminaIntegrante extends Component{
    render() {
        return(
            <div className="col-sm-12">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Seleccionar</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1151454</td>
                        <td>Jhorman Botello</td>
                        <td>jhormanbd@hotmail.com</td>
                        <th scope="row">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="tableDefaultCheck2" />
                                <label className="custom-control-label" htmlFor="tableDefaultCheck2"></label>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <td>115454</td>
                        <td>Elian Zapata</td>
                        <td>elian@ufps.edu.co</td>
                        <th scope="row">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="tableDefaultCheck3"/>
                                <label className="custom-control-label" htmlFor="tableDefaultCheck3"></label>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary">Eliminar</button>
            </div>
        );
    }
}
export default EliminaIntegrante