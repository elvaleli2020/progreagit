import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import '../../Styles/Plantilla.css';

import Invitado from "../Invitado/Invitado";
import MediaInv from "../Invitado/MediaInv";
import MediaAdmin from "../Admin/MediaAdmin";
import MediaLider from "../Lider/MediaLider";
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
import VerIntegrante from "../Lider/VerIntegrante";
import Alert from "react-s-alert";

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

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
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

            console.log("ESTADOS: ",this.state.rol);
            return (
                <div className="Plantilla">
                    <NavBar authenticated={this.state.authenticated}
                            currentUser={this.state.currentUser}
                            rol={this.state.rol}
                            handleLogout={this.handleLogout}></NavBar>
                    <div className="content-wrapper">

                        <section className="contend">
                            <div className="container-fluid">

                                <BrowserRouter>
                                    <Route exact path="/"  component={Invitado}></Route>
                                    <Route path="/oauth2/redirect" component={OAuth2}></Route>
                                    <Route path="/mediaInv" component={MediaInv}></Route>
                                    
                                    <PrivateRoute authenticated={true} path="/invitado"
                                           rol={this.state.rol} component={Invitado}></PrivateRoute>

                                    <PrivateRoute path="/profile"  authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                                  component={Profile} ></PrivateRoute>
                                    <PrivateRoute path="/admin"   authenticated={this.state.rol.admin}
                                                  component={Administrador}></PrivateRoute>
                                    <PrivateRoute path="/buscar_personas"   authenticated={this.state.rol.admin}
                                                  component={BuscaPersonas}></PrivateRoute>
                                    <PrivateRoute path="/lider" authenticated={this.state.rol.leader}
                                                  component={Lider}></PrivateRoute>
                                    <PrivateRoute path="/verIntegrantes" authenticated={this.state.rol.leader}
                                                  component={VerIntegrante} ></PrivateRoute>
                                    <PrivateRoute path="/mediaInv" component={MediaInv} authenticated={this.state.rol.user} ></PrivateRoute>
                                    <PrivateRoute path="/mediaAdmin" component={MediaAdmin} authenticated={this.state.rol.admin} ></PrivateRoute>
                                    <PrivateRoute path="/mediaLider" component={MediaLider} authenticated={this.state.rol.leader}></PrivateRoute>
                                    <PrivateRoute path="/actualizacion" authenticated={this.state.rol.user} user={this.state.currentUser} handleLogout={this.handleLogout}
                                                  component={ActData}></PrivateRoute>

                                </BrowserRouter>
                            </div>
                        </section>
                    </div>
                    <Alert stack={{limit: 3}}
                           timeout = {3000}
                           position='top-right' effect='slide' offset={65} />
                </div>
            )
        }

    }
}

export default Body;
