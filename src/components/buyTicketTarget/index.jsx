import React, { useEffect, useState } from "react";
import "./index.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const moths = [ "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

const BuyTicketTarget = ({ maxTickets, onAreYouRegistered, concert }) => {
  const [tickets, setTickets] = useState(1);

  useEffect(() => {
    console.warn(tickets);
  }, [tickets]);
  const formatDay = (date) => {
    let splitString = date.split("-");
    return splitString[2];
  };

  const formatMonthYear = (date) => {
    let splitString = date.split("-");
    let moth = splitString[1];
    return moths[Number(moth)] + "-" + splitString[0];
  };

  const minNumTickets = (value) => {
    if (value > 1) {
      setTickets(value - 1);
    }
  };

  const maxNumTickets = (value) => {
    if(maxTickets > value){
      setTickets(value +1);
    }
  }

  if (!concert) {
    return <div>Cargando...</div>;
  }
  return (
    <div id="entrada" className="event-body-ticket">
      <div className="event-body-ticket-date">
        <h3>{formatDay(concert.date)}</h3>
        <span style={{ color: "black" }}>
          {concert && formatMonthYear(concert.date)}
        </span>
        <span>{concert.hour}</span>
      </div>
      <div className="event-body-ticket-text">
        <h3>{concert.name}</h3>
        <span>{concert.city}</span>
        {maxTickets === 0 ? (
          <span>Entradas agotadas</span>
        ) : (
          <span>Quedan {maxTickets} entradas</span>
        )}
      </div>
      {maxTickets === 0 ? (
        <>
          <div className="event-body-ticket-num">
            <span>
              <RemoveIcon />
            </span>
            <input id="cantidad" disabled value="0"/>
            <span>
              <AddIcon />
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="event-body-ticket-num">
            <span onClick={() => minNumTickets(tickets)}>
              <RemoveIcon />
            </span>
            <input id="cantidad" type="number" min="1" max={maxTickets} disabled value={tickets} onChange={(e) => setTickets(e.target.value)}/>
            <span onClick={() => maxNumTickets(tickets)}>
              <AddIcon />
            </span>
          </div>
        </>
      )}

      <div className="event-body-ticket-buy">
        <span>{concert.ticketPrice} Euros</span>
        {maxTickets === 0 ? (
          <button className="button-disabled" disabled>
            Agotadas
          </button>
        ) : (
          <button onClick={() => onAreYouRegistered(tickets)}>Comprar</button>
        )}
      </div>
    </div>
  );
};

export default BuyTicketTarget;
