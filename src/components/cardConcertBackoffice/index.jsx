import React from "react";
import "./index.css";

const CardConcertModal = ({ concerts }) => {
  return (
    <div>
      {concerts &&
        concerts.map((concert) => (
          <div className="concert-target">
            <div>
              <p><b>Concierto:</b> {concert.name}</p>
              <p><b>Ciudad:</b> {concert.city}</p>
            </div>
            <div>
              <p><b>Numero entradas:</b> {concert.maxTickets}</p>
              <p><b>Precio entradas:</b> {concert.ticketPrice}</p>
            </div>
            <div>
                <p><b>Artistas:</b>{concert.artists.map((artist) =>(
                    <li>{artist}</li>
                ))}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardConcertModal;
