import React, {Component} from "react";
import '../../Styles/Plantilla.css';
import LoginButton from "./LoginButton";

class NavBar extends Component {

    render() {
        return (
            <React.Fragment>
                <nav className="Plantilla-NavBar">
                    <LoginButton></LoginButton>
                </nav>
            </React.Fragment>
        );
    }
}

export default NavBar;