import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import { Link } from 'react-router-dom';

export default class DestinationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinations: [],
            destId:'', 
        }
    }
    componentDidMount() {
        const destId = this.props.location.state.destId;
    }

    render() {
        const { isAdmin } = this.props;
        console.log(isAdmin)
        return (
            <div className="container" >
                <h1 className="pageTitle">Details Page</h1>
                <div className="box-article">
                    <article className="destDetails">
                        <div className=" destDetImg">
                            <div className="borderImg">
                                <img alt={this.props.location.state.name}
                                    src={this.props.location.state.image}
                                    className="destinationImg img-responsive" />
                            </div>
                        </div>
                        <h4 className="destinationName">
                            {this.props.location.state.name} 
                            in {this.props.location.state.location}</h4>
                        <h6>{this.props.location.state.description} </h6>

                        <Link key={this.props.location.state.destId} to={{
                            pathname: '/destinations/edit/' + this.props.location.state.destId,
                            state: {
                                id: this.props.location.state.destId,
                                key: this.props.location.key,
                                name: this.props.location.state.name,
                                image: this.props.location.state.image,
                                location: this.props.location.state.location,
                                description: this.props.location.state.description,
                                isAdmin: isAdmin
                            }
                        }} className="btn destDetails">Edit Destination</Link>
                    </article>
                </div>
            </div>
        );
    }
}
