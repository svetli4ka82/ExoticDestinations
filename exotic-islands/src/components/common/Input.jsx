import React, { Component } from 'react';
import './common.css';

export default class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label, errors } = this.props;
        return (
            <div className="col-xs-4">
                <label className="label" htmlFor={name}>{label}</label>
                <input className="form-control"
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    value={value}
                    />
                    <span className="error">{errors}</span>
            </div>
        );
    }
}