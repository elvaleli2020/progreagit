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
        this.loading = false;
    }
    getInfoProject(){
        getActiveProject()
            .then(response => {
                this.loading=true;
                this.setState(response);
            }).catch(error => {
            console.log("Está en el catch de getInfoProject");
        });
    }

    render() {
        if (this.loading){
            return (
                <div>
                    <RegProy data={this.state}></RegProy>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }

    }
}

export default Lider;