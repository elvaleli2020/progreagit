import React, {Component} from "react";
import GoogleLogin from "react-google-login";
import {ACCESS_TOKEN, GOOGLE_AUTH_URL} from "../../Global";


class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.login = false;
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
                            <div className="container">
                                <a href="./" className="brand-link brand-link navbar-danger">
                                    <img src="./img/logo_ufps_200.jpg" alt="a"
                                         className="brand-image img-circle elevation-3"
                                         style={{opacity: .8}}/>
                                    <span className="brand-text font-weight"> ProgreaGit </span>
                                </a>
                                <button className="navbar-toggler order-1" type="button" data-toggle="collapse"
                                        data-target="#navbarCollapse" aria-controls="navbarCollapse"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                                    <ul className="navbar-nav ml-auto">
                                        <svg xmlns="https://www.w3.org/2000/svg" width="30" height="30"
                                             viewBox="0 0 48 48" aria-hidden="true" className="L5wZDc">
                                            <path fill="#4285F4"
                                                  d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"></path>
                                            <path fill="#34A853"
                                                  d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"></path>
                                            <path fill="#FBBC05"
                                                  d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"></path>
                                            <path fill="#EA4335"
                                                  d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"></path>
                                            <path fill="none" d="M2 2h44v44H2z"></path>
                                        </svg>
                                        <li className="nav-item d-none d-sm-inline-block">
                                            <a href={GOOGLE_AUTH_URL} className="nav-link text-white"><strong>Inicio de sesión con Google</strong></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    )}
                />
            )
        }else{
            // if(this.props.rol!=null&& this.props.rol.user==false)
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
                                    <a className="nav-link btn btn-sm btn-light text-dark" data-toggle="dropdown"
                                       onClick={this.props.onLogout}>
                                        <span className="nav-icon fas fa-power-off" aria-hidden="true" style={{paddingRight:"10px"}}> </span>
                                         Cerrar sesión
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
