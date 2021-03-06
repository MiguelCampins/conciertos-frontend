import React, { useEffect, useState } from "react";
import { getConcert } from "../../utils/api/apiConcert";
import { formatDay, formatMonthYear } from "../../utils/functions";
import "./index.css";

const UserTickets = ({ sale, onHandleTickets }) => {
 
  const [concert, setConcert] = useState();

  useEffect(() => {
    getConcert(sale.concertId)
      .then((resp) => {
        setConcert(resp);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const totalPrice = () => {
    return concert.ticketPrice * sale.quantity;
  };

  if(!concert || !concert.published){
    return null;
  }

  return (
    <div className="card-sale-ticket-container">
      <div className="card-sale-ticket">
        <div className="card-sale-ticket-date">
          <h3>{concert && formatDay(concert.date)}</h3>
          <span>{concert && formatMonthYear(concert.date)}</span>
          <span style={{color:"grey"}}>{concert && concert.hour}</span>
        </div>
        <div className="card-sale-ticket-info">
          <h4>{concert && concert.name}</h4>
          <span>En la ciudad de {concert && concert.city}</span>
        </div>
        <div className="card-sale-ticket-price">
          <span>Total entradas: {sale.quantity}</span>
          <span><b>Total:</b> {concert && totalPrice()} euros</span>
        </div>
        <div className="card-sale-ticket-button">
          <button onClick={()=>onHandleTickets(sale.quantity, concert)}>Ver</button>
        </div>
      </div>
    </div>
  );
};

export default UserTickets;
