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

    // getUrlParameter(name) {
    //     name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    //     var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    //
    //     var results = regex.exec(this.props.location.search);
    //     console.log(results);
    //     return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    // };

    render() {

        // const token = this.getUrlParameter('token');
        // const error = this.getUrlParameter('error');

        // if(token){
        //     localStorage.setItem(ACCESS_TOKEN, token);
        // }
        // const query = new URLSearchParams(this.props.location.search);
        // const token = query.get('token')
        // console.log(token)
        // console.log(this.props.match.param.token);

        if(!this.login){
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
                           onClick={this.logout()}>
                            Cerrar sesión</a>
                    )}

                />
            )
        }

    }
}

export default LoginButton;
