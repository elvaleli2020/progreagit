import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import '../../Styles/Plantilla.css';

import Invitado from "../Invitado/Invitado";
import MediaInv from "../Invitado/MediaInv";
import PruebaRoute from "../General/PruebaRoute";
import Profile from "../General/Profile";
import Lider from "../Lider/Lider";
import Administrador from "../Admin/Administrador";
import OAuth2 from "../General/OAuth2";

import ActData from "../ActData";
import {ACCESS_TOKEN} from "../../Global";
import {getCurrentUser} from "../../Util/ApiUtil";
import LoadingIndicator from "./LoadingIndicator";
import PrivateRoute from "../PrivateRouter";
import NavBar from "./NavBar";
import BuscaPersonas from "../Admin/BuscaPersonas";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true,
            rol: {
                admin: false,
                leader: false,
                user: false
            }
        };
        if(window.location.pathname=="/oauth2/redirect"){
            this.state.loading=false;
        }

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        console.log("Pase");
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                console.log("Entre al getCurrentUser");
                this.state.autenticated= true;
                if(response.rol!=null&& response.rol.name!=null){
                    if(response.rol.name=="ROLE_ADMIN")
                        this.state.rol.admin=true;
                    else if(response.rol.name=="ROLE_LEADER")
                        this.state.rol.leader=true;
                    else if(response.rol.name=="ROLE_USER")
                        this.state.rol.user=true;

                }
                console.log("#$%&");
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false
                });

            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.state.rol.admin = false;
        this.state.rol.leader = false;
        this.state.rol.user = false;
        this.setState({
            authenticated: false,
            currentUser: null
        });
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        if(this.state.loading) {
            return <LoadingIndicator />
        }else{

            console.log("ESTADOS: ",this.props.location);
            return (
                <div className="Plantilla">
                    <NavBar authenticated={this.state.authenticated}
                            currentUser={this.state.currentUser}
                            handleLogout={this.handleLogout}></NavBar>
                    <div className="content-wrapper">
                        <div className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="contend">
                            <div className="container-fluid">

                                <BrowserRouter>
                                    <Route exact path="/" component={PruebaRoute}></Route>
                                    <Route path="/oauth2/redirect"  autenticated={"si sirve"} component={OAuth2}></Route>
                                    <Route path="/invitado" component={Invitado}></Route>
                                    <Route path="/mediaInv" component={MediaInv}></Route>

                                    <PrivateRoute path="/profile"  authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                                  component={Profile} ></PrivateRoute>
                                    <PrivateRoute path="/admin"   authenticated={this.state.rol.admin}
                                                  component={Administrador}></PrivateRoute>
                                    <PrivateRoute path="/buscar_personas"   authenticated={this.state.rol.admin}
                                                  component={BuscaPersonas}></PrivateRoute>
                                    <PrivateRoute path="/lider" authenticated={this.state.rol.leader}
                                                  component={Lider}></PrivateRoute>
                                    <PrivateRoute path="/actualizacion" authenticated={this.state.rol.user} component={ActData}></PrivateRoute>

                                </BrowserRouter>
                            </div>
                        </section>
                    </div>

                </div>
            )
        }
        // if(this.state.authenticated){
        //         document.getElementById("body").className ='sidebar-mini';
        // }else{
        //     document.getElementById("body").className = '';
        // }

    }
}

export default Body;
