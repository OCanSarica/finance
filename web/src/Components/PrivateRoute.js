import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={props => (

        localStorage.getItem('user_') ?
            <div className="private col-sm-11"><Component {...props} /> </div> :
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)