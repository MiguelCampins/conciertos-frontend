import React from "react";
import "./index.css";
import CloseIcon from "@material-ui/icons/Close";
var QRCode = require("qrcode.react");
var Barcode = require("react-barcode");

const UserTicketsList = ({
  onHandleTickets,
  numTickets,
  concertTicket,
  user,
}) => {
  console.log(concertTicket);
  console.log(user);
  const { name, city, imageUrl, date, hour, ticketPrice } = concertTicket;
  return (
    <div className="tickets-container">
      <div className="tickets-body">
        <div className="tickets-cancel">
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => onHandleTickets(false)}
          />
        </div>
        {numTickets.map((num, index) => (
          <div key={index} className="ticket-container">
            <div className="ticket-info">
              <h1 style={{paddingBottom:"40px"}}>{name}</h1>
              <p><b>Ciudad: </b>{city}</p>
              <p><b>Fecha: </b>{date}</p>
              <p><b>Hora: </b>{hour}h</p>
              <p><b>Precio: </b>{ticketPrice}€</p>
            </div>
            <div className="ticket-img">
              <img alt="img" src={imageUrl} />
            </div>
            <div className="ticket-qr">
              <div className="ticket-qr-up">
                <span>
                  <b>TICKETCLIK.COM</b>
                </span>
                <QRCode
                  value={JSON.stringify({ num, user: user.email })}
                  size={150}
                />
                <span style={{ color: "grey" }}>
                  <b>SCAN AND ENJOY</b>
                </span>
              </div>
              <Barcode height={70} width={1} value="http://ticketclick.com" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTicketsList;
