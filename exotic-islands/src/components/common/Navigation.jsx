import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import './common.css';
import Auth from '../Auth/Auth';
// const { loggedIn, onLogout, isAdmin } = this.props;
const Navigation = (props) => (

    <header className="header-nav navbar ">
        <div className="navbar-brand">
            <div className="logo">Exotic Destinations</div>
        </div>
        <div className="navigation">
            {Auth.isUserAuthenticated()
                ? (
                    <div>
                        <NavLink to="/destinations/add" className="navbar-nav nav">Add Destination</NavLink>
                        <NavLink to="/destinations" className="navbar-nav nav">All Destination</NavLink>
                        <NavLink to="/destinations/mine" className="navbar-nav nav">My Destinations</NavLink>
                        <NavLink to="/users" className="navbar-nav nav">Users</NavLink>
                        <a href="javascript:void(0)" onClick={this.props.onLogout} className="navbar-nav nav">Logout</a>
                    </div>
                ) : (
                    <div>
                        <NavLink exact to="/" className=" nav">Home</NavLink>
                        <NavLink to="/login" className="navbar-nav nav">Login</NavLink>
                        <NavLink to="/register" className="navbar-nav nav">Register</NavLink>
                    </div>
                )}
        </div>
    </header>
)

export default Navigation;