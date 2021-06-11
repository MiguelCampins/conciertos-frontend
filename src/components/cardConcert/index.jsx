import React from "react";
import "./index.css";
import imgDefault from "../../assets/images/pien-muller-Fh-Q-xfdh_o-unsplash.jpg";
import { Link } from "react-router-dom";

const CardConcert = ({ concert }) => {
  const { name, imageUrl, date, city } = concert;

  const formatDate = (date) => {
      let splitString = date.split("-");
      let reverseArray = splitString.reverse();
      let joinArray = reverseArray.join("-");
      return joinArray;
  };

  return (
    <div className="card-concert" data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-delay="100" data-aos-duration="1500">
      <Link to={`/concert?id=${concert._id}`}>
        {imageUrl ? (
          <img alt="img-concert" src={imageUrl} />
        ) : (
          <img alt="img-concert" src={imgDefault} />
        )}
      </Link>  
        <div className="card-concert-text">
          <p><b>{name}</b></p>
          <p>{formatDate(date)}</p>
          <p>En la ciudad de {city}</p>
        </div>
    </div>
  );
};

export default CardConcert;
