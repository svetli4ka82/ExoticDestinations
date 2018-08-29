import React, { Component } from 'react';
import Input from '../common/Input';
import toastr from 'toastr';
import firebase, { auth } from '../../firebase/firebase';

export default class EditDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            name: '',
            image: '',
            location: '',
            description: '',
            userKey: '',
            destination: [],
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //take info from the DB
    componentWillMount(){
        this.getInfoFromDB()
    }

    getInfoFromDB = async () => {
        this.itemsRef = await firebase.database().ref('destinations')

        return this.itemsRef.child(this.state.id)
            .on('value', data => {
                this.setState({
                    name: data.val().name,
                    location: data.val().location,
                    description: data.val().description,
                    image: data.val().image,
                    userKey: data.val().userKey
                });
            })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();

        let destination = this.state;

        let error = '';
        let isValid = true;

        if (!destination.name) {
            error = 'Name is required';
            isValid = false;
        }
        if (!destination.image) {
            error = 'Image is required';
            isValid = false;
        }
        if (!isValid) {
            this.setState({ error });
            return;
        }

        let ref = await firebase.database()
            .ref(`destinations/${this.state.id}`)
            .update({
                name: destination.name,
                location: destination.location,
                description: destination.description,
                image: destination.image,
                userKey: destination.userKey
            })
            .then(() => {
                this.props.history.update('/destinations');
                toastr.success('Destination is edited successfully')
            })
            .catch(error => {
                toastr.error('Edited is not successfully');
                return;
            })
        this.props.history.push('/destinations');
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
                <h1 className="pageTitle">Edit Destination</h1>
                {this.state.error}
                <div className="form-group col" >
                    <form onSubmit={this.onSubmit}>

                        <Input
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            label="Name"
                        />
                        <Input
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            label="Location"
                        />
                        <Input
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            label="Description"
                        />
                        <Input
                            name="image"
                            value={this.state.image}
                            onChange={this.onChange}
                            label="Image"
                        />
                        <input
                            type="submit"
                            className="btn"
                            value="Edit"
                            disabled={this.state.submitting}
                        />
                    </form>
                </div >
            </div >
        );
    };
}

