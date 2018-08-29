import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase, { auth } from '../../firebase/firebase';
import DestinationList from '../Destination/DestinationList';
import Destination from '../Destination/Destination';

import {userId} from '../Users/users.service';

export default class MyDestinations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userKey: '',
            destinations: []
        };
        this.deleteDestination = this.deleteDestination.bind(this);
    }
    componentWillMount() {
      this.getUserCollectionAndSetState();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userKey: user.uid
                })
            }
        })
    }
   

    getUserCollectionAndSetState = () =>{
      firebase.database().ref('destinations/')
        .on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            if (items[item].userKey === firebase.auth().currentUser.uid) {
              newState.push(
                {
                  id: item,
                  name: items[item].name,
                  location: items[item].location,
                  description: items[item].description,
                  image: items[item].image,
                  userKey: items[item].userKey
                }
              );
            }
            this.setState({ destinations: newState });
          }
        });
    };
    
    deleteDestination(id) {
        const itemRef = firebase.database().ref(`/destinations/${id}`);
        itemRef.remove();
        this.setState({ destinations: this.state.destinations.filter(h => h.id !== id) });
    }

    render() {
        return (
            <div className=" container ">
                <div>
                    <h1 className="pageTitle">My Destinations</h1>

                    {this.state.destinations.length === 0
                        ? <h4>No destinations in your collection</h4>
                        : <DestinationList
                            destinations={this.state.destinations}
                            deleteDestination={this.deleteDestination}
                            erasable={true}/>}
                </div>
            </div>
        );
    }
}