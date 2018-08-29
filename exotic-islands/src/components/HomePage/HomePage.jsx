import React, { Component } from 'react';
import Coconut from './../../assets/coconut.jpg'
import './home.css';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { }
    render() {
         return (
            <div className="container">
                <div className="welcome">
                    <h1 className="welcome-title">Welcome to our exotic place.</h1>
                    <div className="welcome-box">
                        <div className="welcome-pic">
                            <img src={Coconut} alt="welcome" />
                        </div>
                    </div>
                    <h1 className="par-Welcome">Do you like travel?</h1>
                    <h2 className="h1-welcome">Do you love exotic places?</h2>
                    <h2 className="h2-Welcome">Welcome to our community of travellers and lover exotic beaches and destinations.</h2>
                </div>
            </div>
        );
    }
}