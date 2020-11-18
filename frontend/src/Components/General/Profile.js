import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../Global';
import { getCurrentUser } from '../../Util/ApiUtil';
import {Redirect} from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    loadCurrentUser(){
        getCurrentUser()
        .then(response => {
            this.setState({
                currentUser: response,
                loading: false
            });
        }).catch(error => {
            this.setState({
                loading: false
            });  
        }); 
    }


    render(){
        console.log(this.props.currentUser);
        if(this.props.currentUser != null){
            if(this.props.currentUser.rol.name=="ROLE_ADMIN"){
                return <Redirect to={{
                    pathname: "/admin",
                    state: {from: this.props.location}
                }}/>;
            }else if(this.props.currentUser.rol.name=="ROLE_LEADER"){
                return <Redirect to={{
                    pathname: "/lider",
                    state: {from: this.props.location}
                }}/>;
            }else{
                if(this.props.currentUser.rol.name=="ROLE_USER"){
                    return <Redirect to={{
                        pathname: "/actualizacion",
                        state: {from: this.props.location}
                    }}/>;
                }
            }
        }    
        return (
            <div>
                <h1>Loading....</h1>
            </div>
        );
    };
}
export default Profile
