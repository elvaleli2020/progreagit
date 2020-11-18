import React, {Component} from 'react';
import './Styles/Plantilla.css';
import Body from './Components/Plantilla/Body'


class Plantilla extends Component  {
    constructor(props) {
        super(props);
        this.authenticated = false;

    }
    render() {
        return (

                <Body autenticated={this.authenticated}></Body>

        );
    }
}

export default Plantilla;
