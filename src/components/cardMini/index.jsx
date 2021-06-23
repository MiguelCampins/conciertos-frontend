import React from 'react';
import { ExternalLink } from 'react-external-link';
import "./index.css";

const CardMini = ({href, src, name}) => {
    return (
        <div className="card-mini-container">
            <ExternalLink href={href}>
                <img alt="img" src={src} />
                <h4>{name}</h4>
            </ExternalLink>
        </div>
    )
};

export default CardMini;