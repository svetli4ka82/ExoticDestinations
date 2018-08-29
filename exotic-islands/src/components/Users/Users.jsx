import React, { Component } from 'react';
import User from './User';
import './user.css'

export default class UsersList extends Component {
    render() {
        return (
            <div className="users-list">
                {this.props.users.map(h => (
                    <User
                        key={h.id}
                        deleteUser={() => this.props.deleteUser(h.id)}
                        id={h.id}
                        firstName={h.firstName}
                        lastName={h.lastName}
                        email={h.email}
                        role={h.role} />
                ))}
            </div>
        );
    }
}