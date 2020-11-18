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

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false
        };
        this.roles = {
            admin: false,
            leader: false,
            user: false
        };
        console.log(this.autenticated);
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
                this.autenticated= true;
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
        }
        return (
            <div className="Plantilla">
                <NavBar authenticated={this.state.authenticated} onLogout={this.handleLogout}></NavBar>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={PruebaRoute}></Route>
                        <PrivateRoute path="/profile"  authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Profile} ></PrivateRoute>
                        <Route path="/invitado" component={Invitado}/>
                        <PrivateRoute path="/profile"  authenticated={this.state.authenticated}
                                      path="/admin" component={Administrador}></PrivateRoute>
                        <Route path="/lider" component={Lider}/>
                        <Route path="/mediaInv" component={MediaInv}/>
                        <Route path="/oauth2/redirect" component={OAuth2}></Route>
                        <Route path="/actualizacion" component={ActData}></Route>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default Body;
