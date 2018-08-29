import React, { Component } from 'react';
import UsersList from './Users';
import User from './User';
import { Link } from 'react-router-dom';
import firebase, { auth } from '../../firebase/firebase';
import './user.css'

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            
        };
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount = async () => {
        return await firebase.database().ref('users/')
            .on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    newState.push({
                        id: item,
                        firstName: items[item].firstName,
                        lastName: items[item].lastName,
                        email: items[item].email,
                        role: items[item].role,
                    });
                }
                this.setState({ users: newState });
            });
    }

    deleteUser(id) {
        const itemRef = firebase.database().ref(`/users/${id}`);
        itemRef.remove();
        this.setState({ users: this.state.users.filter(h => h.id !== id) });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1 className="pageTitle">Users List</h1>

                    {this.state.users.length === 0
                        ? <p>Loading &hellip;</p>
                        : <UsersList
                            users={this.state.users}
                            deleteUser={this.deleteUser} />}
                </div>
            </div>
        );
    }
}