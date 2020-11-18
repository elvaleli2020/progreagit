import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";


const PrivateRoute = ({ component: Component, authenticated,dir='/', ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Component {...rest} {...props} />
            ) : (

                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute
