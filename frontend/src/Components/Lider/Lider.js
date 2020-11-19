import React, {Component} from 'react';
import MediaLider from "./MediaLider";
import RegProy from "./RegProy";
import HistorialProy from "./HistorialProy";
import {getActiveProject} from "../../Util/ApiUtil";


class Lider extends Component {
    constructor() {
        super();
        this.getInfoProject();
        this.state={

        }
    }
    getInfoProject(){
        getActiveProject()
            .then(response => {
                this.setState(response);
            }).catch(error => {
            console.log("Está en el catch de getInfoProject");
        });
    }

    render() {
        return (
            <div>
                {/*<MediaLider></MediaLider>*/}
                <RegProy data={this.state}></RegProy>
                {/*<HistorialProy></HistorialProy>*/}
            </div>

        );
    }
}

export default Lider;