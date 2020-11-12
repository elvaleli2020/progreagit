import React, {Component} from "react";
import '../Styles/Plantilla.css';
import GoogleLogin from "react-google-login";

class NavBar extends Component {

    responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj);
    }

    render() {
        return (
            <React.Fragment>
                <nav className="Plantilla-NavBar">

                    <GoogleLogin
                        clientId="85427988088-s4k27shfdvece624ibl8tfujdaofltc2.apps.googleusercontent.com"
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Inicia Sesión con
                                Google</button>
                        )}
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}

                    />


                </nav>
            </React.Fragment>
        );
    }
}

export default NavBar;