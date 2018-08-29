import React, { Component } from 'react';
import firebase, { auth } from '../../firebase/firebase';
import DestinationList from './DestinationList';
import Destination from './Destination';

export default class DestinationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinations: []
        };
        this.deleteDestination = this.deleteDestination.bind(this);
    }

    componentDidMount() {
        this.getAllDestinations();
    }

    getAllDestinations = async () => {
        await firebase.database().ref('destinations/')
            .on('value', (snapshot) => {
                let items = snapshot.val();

                let newState = [];
                for (let item in items) {
                    newState.push({
                        id: item,
                        name: items[item].name,
                        location: items[item].location,
                        description: items[item].description,
                        image: items[item].image,
                    });
                }
                this.setState({ destinations: newState });
            });
    }

    deleteDestination(id) {
        const itemRef = firebase.database().ref(`/destinations/${id}`);
        itemRef.remove();
        this.setState({ destinations: this.state.destinations.filter(h => h.id !== id) });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1 className="pageTitle">Destinations List</h1>

                    {this.state.destinations.length === 0
                        ? <p>Loading &hellip;</p>
                        : <DestinationList
                            destinations={this.state.destinations}
                            deleteDestination={this.deleteDestination} />}
                </div>
            </div>
        );
    }
}