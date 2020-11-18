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
                <nav className="Plantilla-NavBar">
                    <LoginButton authenticated={this.props.authenticated}></LoginButton>
                </nav>
            </React.Fragment>
        );
    }
}

export default NavBar;
