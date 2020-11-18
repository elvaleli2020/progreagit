import React, {Component} from "react";
import '../../Styles/Plantilla.css';
import LoginButton from "./LoginButton";

class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>

                <LoginButton authenticated={this.props.authenticated} onLogout={this.props.handleLogout}></LoginButton>


                <aside className="main-sidebar elevation-4 sidebar-light-danger">
                    <a href="index3.html" className="brand-link brand-link navbar-danger">
                        <img src="./img/logo_ufps_200.jpg" alt="a"
                             className="brand-image img-circle elevation-3"
                             style={{opacity: .8}}/>
                            <span className="brand-text font-weight-light">ProgreaGit</span>
                    </a>

                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2"
                                     alt="User Image"/>
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Alexander Pierce</a>
                            </div>
                        </div>

                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                data-accordion="false">
                                <li className="nav-item has-treeview menu-open">

                                </li>
                                <li className="nav-item">
                                    <a href="pages/widgets.html" className="nav-link">
                                        <i className="nav-icon fas fa-th"></i>
                                        <p>
                                            Cuenta
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            </React.Fragment>
        );
    }
}

export default NavBar;
