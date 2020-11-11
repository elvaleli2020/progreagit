import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import '../../Styles/Plantilla.css';


import Invitado from "../Invitado/Invitado";
import MediaInv from "../Invitado/MediaInv";
import PruebaRoute from "../General/PruebaRoute";
import OAuth2 from "../General/OAuth2";
import ActData from "../ActData";

class Body extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={PruebaRoute}></Route>
                    <Route path="/Invitado" component={Invitado}/>
                    <Route path="/MediaInv" component={MediaInv}/>
                    <Route path="/oauth2/redirect" component={OAuth2}></Route>
                    <Route path="/Actualización" component={ActData}></Route>
                </div>
            </BrowserRouter>
        )
    }
}

export default Body;