import React, { Component } from 'react';
import Input from '../common/Input';
import { withRouter } from 'react-router-dom';
import firebase, { auth } from '../../firebase/firebase';
import toastr from 'toastr';
import Auth from './Auth';
import './auth.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false,
            userKey: '',
            passUserKey: null
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    passUserKey = () => {
        this.props.callbackFromParent(this.state.userKey);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        if (this.state.email === ''
            || this.state.email === 'undefined'
            || this.state.password === ''
            || this.state.password.length < 6) {
            this.setState({
                error: {
                    message: 'Check the form for errors',
                }
            });
            return;
        }

        firebase.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(() => {
            this.props.history.push('/destinations');
            
            toastr.success('Login successfully');
        }).then(result => {
            Auth.authenticateUser(result.token);

        }).catch(err => {
            this.setState({ error: err });
            toastr.error('Login is not successfully');
            return;
        })
    }

    render() {
        if (this.state.error) {
            return (
                <div className="error">
                    <h2>{this.state.error.message}</h2>
                </div >
            )
        }
        return (
            <div className="container ">
                <div className="container-login">
                    <h1 className="pageTitle">Login</h1>
                    {this.state.error}
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group col">
                            <Input
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeHandler}
                                label="E-mail"
                            />
                            <Input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChangeHandler}
                                label="Password"
                            />
                            <input type="submit" className="btn"
                                value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);
