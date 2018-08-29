import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './user.css';

export default function User({ id, firstName, lastName, email, role, deleteUser }) {
    return (
        <article className=" user">
            <label>Full Name</label>
            <h5 className="username" >{firstName} {lastName}</h5>
            <label>Email</label>
            <p className="email">{email}</p>
            <label>Role</label>
            <h5 className="role">{role}</h5>

         <Link key={id} to={{
                pathname: '/users/edit/' + id,
                state: {
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    role: role
                }
            }} className="btn editUser">Edit user</Link>

            <a href="javascript:void(0)" onClick={deleteUser} className="btn btn-danger">Delete User</a>
        </article>
    );
}