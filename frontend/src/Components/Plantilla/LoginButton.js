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
                        <a className="btn btn-block social-btn google"
                           href={GOOGLE_AUTH_URL}>
                            Iniciar sesión</a>
                        
                    )}

                />
            )
        }else{
            return (
                <GoogleLogin
                    render={renderProps => (
                        <a className="btn btn-block social-btn google"
                           onClick={this.props.onLogout}>
                            Cerrar sesión</a>
                    )}

                />
            )
        }

    }
}

export default LoginButton;
