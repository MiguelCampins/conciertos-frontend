import React from "react";
import "./index.css";
import imgDefault from "../../assets/images/pien-muller-Fh-Q-xfdh_o-unsplash.jpg";
import { Link } from "react-router-dom";

const CardConcert = ({ concert }) => {
  const { name, imageUrl, date } = concert;

  return (
    <div className="card-concert">
      <Link to={`/concert?id=${concert._id}`}>
        {imageUrl ? (
          <img alt="img-concert" src={imageUrl} />
        ) : (
          <img alt="img-concert" src={imgDefault} />
        )}
      </Link>  
        <div className="card-concert-text">
          <p><b>{name}</b></p>
          <p>{date}</p>
        </div>
    </div>
  );
};

export default CardConcert;
