import React, { Component } from 'react';
import Destination from './Destination';

export default class DestinationList extends Component {
    render() {
        return (
            <div className="destination-list">
                {this.props.destinations.map(h => (
                    <Destination
                        del={() => this.props.deleteDestination(h.id)}
                        key={h.name}
                        id={h.id}
                        name={h.name}
                        location={h.location}
                        image={h.image}
                        description={h.description}
                       />
                ))}
            </div>
        );
    }
}