import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase, { auth } from '../../firebase/firebase';
import './common.css';

export default class HomePage extends Component {
    constructor() {
        super();
    }

    componentDidMount() { }
    render() {
        return (
            <div className="footer">
                <h6 className="footer-title">Exotic Destinations</h6>
            </div>
        );
    }
}