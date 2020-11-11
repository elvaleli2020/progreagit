import React, {Component} from "react";
import GoogleLogin from "react-google-login";
import {ACCESS_TOKEN, GOOGLE_AUTH_URL} from "../../Global";


class LoginButton extends Component {
    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj);
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
        return (
            <GoogleLogin
                clientId="85427988088-s4k27shfdvece624ibl8tfujdaofltc2.apps.googleusercontent.com"
                render={renderProps => (
                    <a className="btn btn-block social-btn google"
                       href={GOOGLE_AUTH_URL}>
                        Log in with Google</a>
                )}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}

            />
        )
    }
}

export default LoginButton;