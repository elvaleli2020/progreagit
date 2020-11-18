import React, {Component} from "react";
import GoogleLogin from "react-google-login";
import {ACCESS_TOKEN, GOOGLE_AUTH_URL} from "../../Global";
import {Redirect} from "react-router-dom";


class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.login = false;
        console.log(this.props);
        this.authenticated = this.props.authenticated
        if(localStorage.getItem(ACCESS_TOKEN)!=null){
            this.login = true;
        }
    }
    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj);
    }

    logout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.authenticated = false;
    }

    render() {

        if(!this.props.authenticated){
            return (
                <GoogleLogin
                    render={renderProps => (
                        <nav className="main-header navbar navbar-expand-md navbar-dark navbar-danger">
                            <ul className="navbar-nav">
                                <li className="nav-item d-none d-sm-inline-block">
                                    <a href={GOOGLE_AUTH_URL} className="nav-link">Inicio de sesión</a>
                                </li>
                            </ul>
                        </nav>
                        
                    )}

                />
            )
        }else{
            return (
                <GoogleLogin
                    render={renderProps => (
                        <nav className="main-header navbar navbar-expand navbar-dark navbar-danger">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                                        className="fas fa-bars"></i></a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link" data-toggle="dropdown"
                                       onClick={this.props.onLogout}>
                                        Cierre sesión
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    )}

                />
            )
        }

    }
}

export default LoginButton;
