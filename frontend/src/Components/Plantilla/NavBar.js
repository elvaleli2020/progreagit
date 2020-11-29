import React, {Component} from "react";
import '../../Styles/Plantilla.css';
import LoginButton from "./LoginButton";
import Menu from "./Menu";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.body = document.querySelector('body');


    }
    render() {

        if(this.props.authenticated && !this.props.rol.user){
            return (
                <React.Fragment>

                    <LoginButton authenticated={this.props.authenticated} onLogout={this.props.handleLogout}></LoginButton>


                    <aside className="main-sidebar elevation-4 sidebar-light-danger">
                        <a href="./" className="brand-link brand-link navbar-danger">
                            <img src="./img/logo_ufps_200.jpg" alt="a"
                                 className="brand-image img-circle elevation-3"
                                 style={{opacity: .8}}/>
                            <span className="brand-text font-weight"> ProgreaGit </span>
                        </a>

                        <div className="sidebar">
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="image">
                                    <img src={this.props.currentUser.imageUrl} className="img-circle elevation-2"
                                         alt={this.props.currentUser.name}/>
                                </div>
                                <div className="info">
                                    <a href="#" className="d-block">{this.props.currentUser.name}</a>
                                </div>
                            </div>

                            <Menu rol={this.props.rol}></Menu>
                        </div>
                    </aside>
                </React.Fragment>
            );
        }else{
            this.body.setAttribute('class','layout-top-nav');
            return (
                <React.Fragment>

                    <LoginButton authenticated={this.props.authenticated} onLogout={this.props.handleLogout}
                                 rol={this.props.rol}></LoginButton>

                </React.Fragment>
            );
        }
    }
}

export default NavBar;
