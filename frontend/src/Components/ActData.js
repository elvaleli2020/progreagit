//Este archivo contendrá el actualizador de datos una vez se autentique con Google por primera vez en el sistema
import React, {Component} from 'react';
import {putCurrentUser} from '../Util/ApiUtil'
import {ACCESS_TOKEN} from "../Global";


class ActData extends Component {
    constructor(props) {
        super(props);
        this.comprobacion=this.props.user.code;
        this.comprobarCorreo();
        this.state = {
            code: this.props.user.code,
            personalEmail: this.props.user.personalEmail,
            address: this.props.user.address,
            cellphone: this.props.user.cellphone,
            requestLeader: this.props.user.petitionLeader,
            social:""
        };
        this.seGuardo = false;
        console.log(this.state);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputCheckBox = this.handleInputCheckBox.bind(this);
    }

    comprobarCorreo(){
        this.compEmail = false;
        console.log("Correo: ", this.props.user.email);
        const email = this.props.user.email;
        let sep= email.split("@");
        console.log(sep);
        if(sep.length==2){
            if(sep[1]=="ufps.edu.co"){
                this.compEmail = true;
            }
        }

    }
    handleInputCheckBox(event) {
        const target = event.target;
        console.log(target.value);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        const loginRequest = Object.assign({}, this.state);

        putCurrentUser(loginRequest)
            .then(response => {
                    this.refescarVista();
                this.seGuardo=true;
                this.setState({nuevo:true});
            }).catch(error => {
            console.log('Entró por el catch error');
        });

    }

    refescarVista(){
        setTimeout(()=>{
            this.props.handleLogout();
            this.setState();
        },6000);
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
        if(!this.compEmail){
            // this.refescarVista();
            return (
                <div className="Pantilla-body">
                    <h3 className="text-center">
                        EL correo no posee permisos necesarios, no es corporativo de la <br/>
                        Universidad Francisco de Paula Santander<br/>
                        <strong>PROGREAGIT</strong>. <br/>
                    </h3>
                </div>
            );
        }else if(this.comprobacion!=null) {
            // this.refescarVista();
            return (
                <div className="Pantilla-body">
                    <h3 className="">
                        Ya se encuentra registrado en <strong>PROGREAGIT</strong>. <br/>
                        Porfavor espere la confirmación del administrador, para acceder a su perfíl.
                    </h3>
                </div>
            );
        }else if (!this.seGuardo){
            return (
                <div className="Plantilla-body">
                    <h1>Actualización de datos</h1>
                    <form onSubmit={this.handleSubmit} autoComplete="false">
                        <div className="form-group">
                            <label htmlFor="code">Código U.F.P.S.</label>
                            <input type="text" value={this.state.code} className="form-control" id="code"
                                   onChange={(e)=>{this.setState({code: e.target.value})}} placeholder="Digite su código de estudiante U.F.P.S" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Personal</label>
                            <input type="email" className="form-control" value={this.state.personalEmail} id="email"
                                   onChange={(e)=>{this.setState({personalEmail: e.target.value})}}
                                   aria-describedby="emailHelp" placeholder="Digite su email personal" required/>
                            <small id="emailHelp" className="form-text text-muted">Nunca compartiremos esta información con nadie más</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Dirección</label>
                            <input type="text" className="form-control" value={this.state.address} id="direccion"
                                   onChange={(e)=>{this.setState({address: e.target.value})}}
                                   placeholder="Digite su dirección de residencia" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="callphone">Teléfono</label>
                            <input type="text" className="form-control" value={this.state.cellphone} id="telefono"
                                   onChange={(e)=>{this.setState({cellphone: e.target.value})}}
                                   placeholder="Digite su número telefónico" required/>
                        </div>
                        <div className="form-group" >
                            <label htmlFor="txtAreaResum">Redes Sociales:</label>
                            <input className="form-control" value={this.state.social}
                                   onChange={(e)=>{this.setState({social: e.target.value})}}
                                   id="socialMedia" />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" value={true} id="requestLeader" checked={this.state.requestLeader}
                                   onChange={this.handleInputCheckBox}/>

                            <label className="form-check-label" htmlFor="solicitud">Seleccione si desea ser Líder</label>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </form>
                </div>
            );
        }else{
            return(
                <div>
                    <h1>Actualización de datos realizada con Éxito !</h1>
                </div>
            );
        }

    }
}

export default ActData;
