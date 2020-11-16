import React, {Component} from 'react';
import MediaLider from "./MediaLider";
import RegProy from "./RegProy";
import HistorialProy from "./HistorialProy";


class Lider extends Component {
    render() {
        return (
            <div>
                {/*<MediaLider></MediaLider>*/}
                <RegProy></RegProy>
                <HistorialProy></HistorialProy>
            </div>

        );
    }
}

export default Lider;