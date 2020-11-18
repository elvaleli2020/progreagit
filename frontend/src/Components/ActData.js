//Este archivo contendrá el actualizador de datos una vez se autentique con Google por primera vez en el sistema
import React, {Component} from 'react';
import {putCurrentUser} from '../Util/ApiUtil'
import {ACCESS_TOKEN} from "../Global";


class ActData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            email: "",
            address: "",
            cellphone: "",
            redes: "",
            req: "",
            social:""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();

        const loginRequest = Object.assign({}, this.state);

        putCurrentUser(loginRequest)
            .then(response => {
                alert(response);
            }).catch(error => {
            alert('Entró por el catch error');
        });
        alert('La info que muestra' + JSON.stringify(this.state));
    }

    render() {
        return (
            <div className="Plantilla-body">
                <h1>Actualización de datos</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cod">Código U.F.P.S.</label>
                        <input type="text" value={this.state.cod} className="form-control" id="cod"
                               onChange={(e)=>{this.setState({cod: e.target.value})}} placeholder="Digite su código de estudiante U.F.P.S"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Personal</label>
                        <input type="email" className="form-control" value={this.state.email} id="email"
                               onChange={(e)=>{this.setState({email: e.target.value})}}
                               aria-describedby="emailHelp" placeholder="Digite su email personal"/>
                            <small id="emailHelp" className="form-text text-muted">Nunca compartiremos esta información con nadie más</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" className="form-control" value={this.state.direccion} id="direccion"
                               onChange={(e)=>{this.setState({direccion: e.target.value})}}
                               placeholder="Digite su dirección de residencia"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="text" className="form-control" value={this.state.telefono} id="telefono"
                               onChange={(e)=>{this.setState({telefono: e.target.value})}}
                               placeholder="Digite su número telefónico"/>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="txtAreaResum">Redes Sociales:</label>
                        <input className="form-control" value={this.state.social} id="socialMedia" />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" value={this.state.solicita} id="solicitud"
                               onChange={(e)=>{this.setState({solicita: e.target.value})}}/>
                        <label className="form-check-label" htmlFor="solicitud">Seleccione si desea ser Líder</label>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                </form>
            </div>

        );
    }
}

export default ActData;