import React, {Component} from 'react';
import {ACCESS_TOKEN} from '../../Global';
import {Redirect} from 'react-router-dom'

class OAuth2 extends Component {
    constructor(props) {
        super(props);
        console.log("OAuth2 : ",this.props);
        console.log(this.props.location);
    }

    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            console.log("ASINGNE EL TOKEN");
            return <Redirect to={{
                pathname: "/profile",
                state: {from: this.props.location}
            }}/>;
        } else {
            return <Redirect to={{
                pathname: "/",
                state: {
                    from: this.props.location,
                    error: error
                }
            }}/>;
        }
    }
}

export default OAuth2;
