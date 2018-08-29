import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../common/Input';
import firebase from '../../firebase/firebase';
import toastr from 'toastr';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeat: '',
            role: 'User',
            errors: {}
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState(({ [e.target.id]: e.target.value }));
    }

    onSubmitHandler(e) {
        e.preventDefault();

        if (this.state.firstName === ''
            || this.state.firstName === 'undefined'
            || this.state.lastName === ''
            || this.state.lastName === 'undefined'
            || this.state.email === ''
            || this.state.email === 'undefined'
            || this.state.password === ''
            || this.state.password.length < 6
            || this.state.repeat === ''
            || this.state.repeat !== this.state.password) {
            this.setState({
                errors: {
                    message: 'Check the form for errors',
                }
            });
            return;
        }

        if (this.state.password !== this.state.repeat) {
            this.setState({
                errors: {
                    message: 'Check the form for errors',
                    error: {
                        repeat: "Passwords don't match!"
                    }
                }
            });
            return;
        }

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: 'User'
        }

        firebase.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(() => {
            firebase.database().ref('users')
                .push(user)
                .then(() => {
                    this.props.history.push('/');
                    toastr.success('Registration is successfully');
                })
        }).catch(err => {
            this.setState({ error: err });
            toastr.error('Registration is not successfully');
            return;
        })
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
            <div className="container" >
                <h1 className="pageTitle">Register</h1>
                {this.state.error}
                <form onSubmit={this.onSubmitHandler} >
                    <div className="form-group col">
                        <Input
                            name="firstName"
                            type="text"
                            value={this.state.firstName}
                            onChange={this.onChangeHandler}
                            label="FirstName"
                            errors={this.state.firstName}
                        />
                        <Input
                            name="lastName"
                            type="text"
                            value={this.state.lastName}
                            onChange={this.onChangeHandler}
                            label="LastName"
                            errors={this.state.lastName}
                        />
                        <Input
                            name="email"
                            type="text"
                            value={this.state.email}
                            onChange={this.onChangeHandler}
                            label="E-mail"
                            errors={this.state.email}
                        />
                        <Input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangeHandler}
                            label="Password"
                            errors={this.state.password}
                        />
                        <Input
                            name="repeat"
                            type="password"
                            value={this.state.repeat}
                            onChange={this.onChangeHandler}
                            label="Repeat password"
                            errors={this.state.repeat}
                        />
                        <input type="submit" className="btn" value="Register" />
                    </div>
                </form>
            </div >
        );
    }
}

export default withRouter(RegisterPage);