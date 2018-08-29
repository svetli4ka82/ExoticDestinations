import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import './common.css';

export default class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: ''
        }
    }

    
    componentDidUpdate(prevProps){
      if ( JSON.stringify(this.props) !== JSON.stringify(prevProps) ) {
        this.setState({isAdmin:true})
      }
    }
    
    render() {
        const { loggedIn, onLogout, isAdmin } = this.props;
        return (
            <header className="header-nav navbar ">
                <div className="navbar-brand">
                    <div className="logo">Exotic Destinations</div>
                </div>

                <div className="navigation">
                    <NavLink exact to="/" className=" nav">Home</NavLink>
                    {/* //!loggedIn */}
                    {!loggedIn && <NavLink to="/login" className="navbar-nav nav">Login</NavLink>}

                    {!loggedIn && <NavLink to="/register" className="navbar-nav nav">Register</NavLink>}

                    {/* //loggedIn */}
                    {loggedIn && <NavLink to="/destinations/add" className="navbar-nav nav">Add Destination</NavLink>}

                    {loggedIn && <NavLink to="/destinations" className="navbar-nav nav">All Destination</NavLink>}

                    {loggedIn && <NavLink to="/destinations/mine" className="navbar-nav nav">My Destinations</NavLink>}

                    {/* isAdmin */}

                    {loggedIn && this.props.isAdmin && <NavLink to="/users" className="navbar-nav nav">Users</NavLink>}

                    {loggedIn && <a href="javascript:void(0)" onClick={this.props.onLogout} className="navbar-nav nav">Logout</a>}
                </div>
            </header>
        );
    }
}

