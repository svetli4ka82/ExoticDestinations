import React, { Component } from 'react';
import Destination from './Destination';

export default class DestinationList extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className="destination-list">
                {this.props.destinations.map(h => (
                    <Destination
                        erasable={this.props.erasable}
                        isAdmin={this.props.isAdmin}
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