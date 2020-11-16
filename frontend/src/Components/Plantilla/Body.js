import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import '../../Styles/Plantilla.css';


import Invitado from "../Invitado/Invitado";
import MediaInv from "../Invitado/MediaInv";
import PruebaRoute from "../General/PruebaRoute";
import Profile from "../General/Profile";
import Lider from "../Lider/Lider";
import Administrador from "../Admin/Administrador";
import OAuth2 from "../General/OAuth2";

import ActData from "../ActData";

class Body extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={PruebaRoute}></Route>
                    <Route path="/profile" component={Profile} ></Route>
                    <Route path="/invitado" component={Invitado}/>
                    <Route path="/admin" component={Administrador}/>
                    <Route path="/lider" component={Lider}/>
                    <Route path="/mediaInv" component={MediaInv}/>
                    <Route path="/oauth2/redirect" component={OAuth2}></Route>
                    <Route path="/actualizacion" component={ActData}></Route>
                </div>
            </BrowserRouter>
        )
    }
}

export default Body;