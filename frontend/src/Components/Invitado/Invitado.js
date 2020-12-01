import React, {Component} from 'react';
import '../../Styles/Plantilla.css';
import TableInvitado from "./TableInvitado";
import BuscaInvitado from "./BuscaInvitado";
import {dataAutor, postShowGuest} from "../../Util/ApiUtil";
import Alert from "react-s-alert";
import LoadingInternal from "../Plantilla/LoadingInternal";
import {handleInputChange} from "../../Util/FormUtil";
import {ACCESS_TOKEN} from "../../Global";


class Invitado extends Component {
    constructor(props) {
        super(props);
        console.log("PROPS: ",this.props.rol);
        this.state={
            data:[],
            loading:true,
            select:"estudiante",
            valor:""
        };
        this.cargarDatos(null);
        this.cargarDatos = this.cargarDatos.bind(this);
        this.handleInputChange = handleInputChange.bind(this);
        this.comprobarCuenta();
     }

    comprobarCuenta(){
        if(this.props.rol!=undefined){
            if(this.props.rol.user) {
                localStorage.removeItem(ACCESS_TOKEN);
            }else if(this.props.rol.admin){
                this.redireccionarPagina("admin")
            }else if(this.props.rol.leader) {
                this.redireccionarPagina("lider");
            }
        }
     }

     redireccionarPagina(pag){
         window.location.href ="../" + pag;
     }
    cargarDatos(event){
        if(event)
            event.preventDefault();

        let search;
        if(this.state.select=="estudiante")
            search = Object.assign({},{"student":this.state.valor});
        else if(this.state.select=="titulo")
            search = Object.assign({},{"name":this.state.valor});
        else if (this.state.select=="fecha")
            search = Object.assign({},{"dateLimit":this.state.valor});
        else search = Object.assign({},{});

        this.setState({
            loading:true
        })
        postShowGuest(search)
            .then(response => {
                dataAutor(response);
                console.log(response);
                this.setState({
                    loading:false,
                    data:response
                });
            }).catch(error => {
            this.setState({loading: false})
            console.log(error);
        });
    }

    render() {
        return (
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <br/>
                 <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.cargarDatos}>
                                    <div className="form-group row">
                                        <div className="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 form-inline">
                                            <label htmlFor="inputInvitado" className="col-12 col-sm-3 col-md-6 col-lg-5 col-xl-4">Buscar por: </label>
                                            <select id="select" defaultValue={this.state.select}
                                                    onChange={this.handleInputChange}
                                                    className=" form-control col-12 col-sm-9 col-md-6 col-lg-7 col-xl-8">
                                                <option value="estudiante">Estudiante</option>
                                                <option value="titulo">Título</option>
                                                <option value="fecha">Año</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-7 col-lg-6 col-xl-6 form-inline">
                                            <input id="valor" type="text" value={this.state.valor}
                                                   onChange={this.handleInputChange}
                                                   className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" placeholder="Digite su búsqueda"/>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
                                            <button type="submit" className="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-12 col-xl-12">Buscar</button>
                                        </div>
                                        <br/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    {
                        this.state.loading?(
                            <LoadingInternal></LoadingInternal>
                        ):(
                            <TableInvitado data={this.state.data}/>
                        )
                    }
                </div>
                <br/>
                <div>
                    <a href="./mediaInv" className="nav-link">
                        <i className="nav-icon fas fa-archive"></i>
                        <p>
                            Guía de uso
                        </p>
                    </a>
                </div>

            </div>

        );
    }
}
export default Invitado;
