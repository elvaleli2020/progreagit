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
            requestLeader: "",
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
    addClick(){
        this.setState(prevState => ({
            redes: [...prevState.redes, { redes: ""}]
        }))
    }

    createUI(){
        return this.state.redes.map((el, i) => (
            <div key={i} className="form-group">
                <label htmlFor="InputRedes">Red Social #{i+1}</label>
                <input type='text' className="form-control" name={"red_"+(i+1)}
                       id="InputRedes" placeholder="Inserte URL de su perfil en red social" value={el.redes ||''}
                       onChange={this.handleChange.bind(this, i)}
                />
                <input type='button' className="form-control" value='Eliminar' onClick={this.removeClick.bind(this, i)}/>
                <br/>
            </div>
        ))
    }

    handleChange(i, e) {
        console.log("Valor: "+e.target.value, "Name: "+e.target.name);
        const { name, value } = e.target;
        let redes = [...this.state.redes];
        redes[i] = {...redes[i], [name]: value};
        this.setState({ [name]:value });

    }

    removeClick(i){
        let redes = [...this.state.redes];
        redes.splice(i, 1);
        this.setState({ redes });
    }

    // handleSubmit(event) {
    //     alert('Una red social fue añadida ' + JSON.stringify(this.state.redes));
    //     event.preventDefault();
    // }

    render() {
        return (
            <div className="Plantilla-body">
                <h1>Actualización de datos</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="code">Código U.F.P.S.</label>
                        <input type="text" value={this.state.code} className="form-control" id="code"
                               onChange={(e)=>{this.setState({code: e.target.value})}} placeholder="Digite su código de estudiante U.F.P.S"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Personal</label>
                        <input type="email" className="form-control" value={this.state.personalEmail} id="email"
                               onChange={(e)=>{this.setState({personalEmail: e.target.value})}}
                               aria-describedby="emailHelp" placeholder="Digite su email personal"/>
                            <small id="emailHelp" className="form-text text-muted">Nunca compartiremos esta información con nadie más</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input type="text" className="form-control" value={this.state.address} id="direccion"
                               onChange={(e)=>{this.setState({address: e.target.value})}}
                               placeholder="Digite su dirección de residencia"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="callphone">Teléfono</label>
                        <input type="text" className="form-control" value={this.state.cellphone} id="telefono"
                               onChange={(e)=>{this.setState({cellphone: e.target.value})}}
                               placeholder="Digite su número telefónico"/>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="txtAreaResum">Redes Sociales:</label>
                        <input className="form-control" value={this.state.social}
                               onChange={(e)=>{this.setState({social: e.target.value})}}
                               id="socialMedia" />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input"  value={this.state.requestLeader} id="solicitud"
                               onChange={(e)=>{this.setState({requestLeader: e.target.value})}}/>

                        <label className="form-check-label" htmlFor="requestLeader">Seleccione si desea ser Líder</label>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                </form>
            </div>

        );
    }
}

export default ActData;
