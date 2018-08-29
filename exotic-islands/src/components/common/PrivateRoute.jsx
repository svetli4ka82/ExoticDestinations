import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../Auth/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        (Auth.isUserAuthenticated()
            ? (<Component {...props} />)
            : (<Redirect to='/login' />
            ))
    } />
)

export default PrivateRoute;
