import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./index.css";

const UpdateconcertModal = ({ show, onCloseModal, concert, onUpdateconcert}) => {
  const [name, setName] = useState(concert.name);
  const [date, setDate] = useState(concert.date);
  const [hour, setHour] = useState(concert.hour);
  const [city, setCity] = useState(concert.city);
  const [tickets, setTickets] = useState(concert.maxTickets);
  const [price, setPrice] = useState(concert.ticketPrice);
  const [artists, setArtists] = useState(concert.artists.join(","));
  const [validationError, setValidationError ] = useState(false);

  const validateConcertAndSave = () => {
    let hasError = false;
    // validamos que están todos los campos
    if(!name || !date || !city || !tickets || !price || !artists || !hour) {
      hasError = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
    if(hasError) {
      setValidationError(true);
    } else {
      // si no hay error, guardamos
      onUpdateconcert({ name, date,hour, city, maxTickets:tickets, ticketPrice:price, artists:artists.split(","), _id: concert?._id})
    }
  }; 

  return (
    <div>
      <Modal show={show}>
        <div className="update-form">
          <h1>Actualizar concierto</h1>
          <hr />
          <div className="update-form-body">
              <input defaultValue={name} onChange={(e) => setName(e.target.value)}/>
              <input defaultValue={date} type="date" onChange={(e) => setDate(e.target.value)} />
              <input defaultValue={hour} type="time" onChange={(e)=> setHour(e.target.value)}/>
              <input defaultValue={city} onChange={(e) => setCity(e.target.value)} />
              <input defaultValue={tickets} onChange={(e) => setTickets(e.target.value)} />
              <input defaultValue={price} onChange={(e) => setPrice(e.target.value)} />
              <input defaultValue={artists} onChange={(e) => setArtists(e.target.value)} />
          </div>
          {validationError && <p style={{color:'red'}}>Error de validacion!!</p>}
          <hr />
          <div className="update-form-footer">
            <button onClick={() => onCloseModal()}>Cerrar</button>
            <button onClick={validateConcertAndSave}>Actualizar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateconcertModal;
