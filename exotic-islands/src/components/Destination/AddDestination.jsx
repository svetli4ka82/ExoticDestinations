import React, { Component } from 'react';
import Input from '../common/Input';
import firebase from '../../firebase/firebase';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import './destination.css';

class AddDestination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            description: '',
            image: '',
            userKey: '',
            error: false,
           
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userKey: user.uid
                })
            }
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();

        const destination = {
            userKey: this.state.userKey,
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            image: this.state.image,
        };

        const error = { message: '', errors: {} };

        if (destination.description.length < 10) {
            error.message = 'Check the form for errors!';
            error.errors.description = 'Description must be more than 10 symmbols.';
        }

        if (error.message) {
            this.setState({ error, submitting: false });
            return;
        }

        firebase.database().ref('destinations')
            .push(destination).then(() => {
                this.props.history.push('/destinations');
                toastr.success('Destination is added successfully');
            }).catch(err => {
                this.setState({ error: err });
                toastr.error('Added is not successfully');
                return;
            })
        this.setState({ error: false });
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
                <h1 className="pageTitle">Add Destination</h1>
                {this.state.error}
                <form onSubmit={this.onSubmitHandler} >
                    <div className="form-group col">
                        <Input
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeHandler}
                            label="Name"
                        />
                        <Input
                            name="location"
                            value={this.state.location}
                            onChange={this.onChangeHandler}
                            label="Location"
                        />
                        <Input
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeHandler}
                            label="Description"
                        />
                        <Input
                            name="image"
                            value={this.state.image}
                            onChange={this.onChangeHandler}
                            label="Image"
                        />
                        <input
                            type="submit"
                            className="btn btnAdd"
                            value="Add Destination"
                            disabled={this.state.submitting}
                        />
                    </div>
                </form>
            </div>
        );
    };
}

export default withRouter(AddDestination);