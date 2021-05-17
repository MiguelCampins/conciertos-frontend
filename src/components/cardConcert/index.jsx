import React from "react";
import "./index.css";

const CardConcert = ({concert }) => {
const {name,imgUrl,date,city} = concert;

  return (
    <div className="card-concert">
      <img alt="img-concert" src={imgUrl} />
      <p>{name}</p>
      <p>{city}</p>
      <p>{date}</p>
      <button className="btn btn-primary">Concierto</button>
    </div>
  );
};

export default CardConcert;
