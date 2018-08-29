import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Destination({ id, name, image, location, description, del, isAdmin }) {
    console.log(isAdmin)
    return (
        <article className="destination">
            <div className="destinationImg">
                <div className="borderImg">
                    <img alt={name} src={image} className="destImg" />
                </div>
            </div>
            < h3 className="destName">{name}</h3>
            <div className="btns">
                <Link to={{
                    pathname: 'destinations/' + id,
                    state: {
                        destId: id,
                        name: name,
                        image: image,
                        location: location,
                        description: description
                    }
                }}
                    className="btn destinationDetails">View Details</Link>
                {isAdmin &&
                    <a href="javascript:void(0)" onClick={del} className="btn btn-danger">Delete</a>
                }
            </div>
        </article>
    );
}