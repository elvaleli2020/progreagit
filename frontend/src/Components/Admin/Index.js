import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Administrador from "./Administrador";
import BuscaPersonas from "./BuscaPersonas";

class Index extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        console.log("Pase por index");
        return (
            <BrowserRouter>
                <Route exact path="/" component={Administrador}></Route>
                <Route path="/personas" component={BuscaPersonas}></Route>
            </BrowserRouter>
        )
    };

}
export default  Index