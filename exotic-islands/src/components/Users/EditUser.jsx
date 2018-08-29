import './user.css'
import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import Input from '../common/Input';
import toastr from 'toastr';

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            user: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    //take info from the DB
    componentWillMount = () => {
        this.getInfoFromDB()
    }
    getInfoFromDB = async () => {
        return await firebase.database().ref('users')
            .child(this.state.id)
            .on('value', data => {
                this.setState({
                    firstName: data.val().firstName,
                    lastName: data.val().lastName,
                    email: data.val().email,
                    role: data.val().role,
                });
            })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();

        let user = this.state;
        let error = '';
        if (this.state.firstName === ''
            || this.state.firstName === 'undefined'
            || this.state.lastName === ''
            || this.state.lastName === 'undefined'
            || this.state.email === ''
            || this.state.email === 'undefined'
            || this.state.role === '') {
            this.setState({
                error: {
                    message: 'Check the form for errors',
                }
            });
            return;
        }
        let ref = await firebase.database()
            .ref(`users/${this.state.id}`)
            .update({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            })
            .then(() => {
                this.props.history.update('/users');
                toastr.success('User information is edited successfully')
            })
            .catch(error => {
                toastr.error('Edited is not successfully');
                return;
            })
        this.props.history.push('/users');
    }

    render() {
        if (this.state.error) {
            return (
                < div className="error">
                    <h2>{this.state.error.message}</h2>
                </div >
            )
        }
        return (
            <div className="container">
                <h1 className="pageTitle">Edit User Information</h1>
                {this.state.error}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group col">
                        <Input
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChange}
                            label="First Name"
                        />
                        <Input
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onChange}
                            label="Last Name"
                        />
                        <Input
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            label="Email"
                        />
                        <Input
                            name="role"
                            value={this.state.role}
                            onChange={this.onChange}
                            label="Role"
                        />
                        <input
                            type="submit"
                            className="btn"
                            value="Edit User"
                            disabled={this.state.submitting}
                        />
                    </div>
                </form>
            </div>
        );
    };
}
