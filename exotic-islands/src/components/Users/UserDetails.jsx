import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import { Link } from 'react-router-dom';

export default class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        const destId = this.props.location.state.destId;
    }

    render() {
        return (
            <div className="container" >
                <h1 className="pageTitle">User Details </h1>
                <article className="destDetails">
                    <div className=" destDetImg">
                        <div className="borderImg">
                            <img alt={this.props.location.state.name}
                                src={this.props.location.state.image}
                                className="userImg img-responsive" />
                        </div>
                    </div>
                    <h4 className="userName">
                        {this.props.location.state.name} in {this.props.location.state.location}</h4>
                    <h6>{this.props.location.state.description} </h6>

                    <Link key={this.props.location.state.destId} to={{
                        pathname: '/users/edit/' + this.props.location.state.destId,
                        state: {
                            id: this.props.location.state.destId,
                            key: this.props.location.state.destId,
                            firstName: this.props.location.state.firstName,
                            lastName: this.props.location.state.lastName,
                            email: this.props.location.state.email,
                            role: this.props.location.state.role
                        }
                    }} className="btn userDetails">Edit user</Link>
                </article>
            </div>
        );
    }
}
