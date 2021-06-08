import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { isValidNumber, isValidstring } from "../../utils/functions";
import CustomSpinner from "../../components/spinner";
import "./index.css";
import MultiInput from "../multiImput";

const UpdateconcertModal = ({
  show,
  onCloseModal,
  concert,
  onUpdateconcert,
  loading,
}) => {
  const [name, setName] = useState(concert.name);
  const [date, setDate] = useState(concert.date);
  const [hour, setHour] = useState(concert.hour);
  const [city, setCity] = useState(concert.city);
  const [tickets, setTickets] = useState(concert.maxTickets);
  const [price, setPrice] = useState(concert.ticketPrice);
  const [artists, setArtists] = useState(concert.artists.join(","));
  const [errors, setErrors] = useState({});

  const validateConcertAndSave = () => {
    const errs = {};
    // validamos que están todos los campos
    if (!name) {
      errs.hasError = true;
      errs.name = true;
    }
    if (!date) {
      errs.hasError = true;
      errs.date = true;
    }
    if (!hour) {
      errs.hasError = true;
      errs.hour = true;
    }
    if (!city || !isValidstring(city)) {
      errs.hasError = true;
      errs.city = true;
    }
    if (!tickets || !isValidNumber(tickets)) {
      errs.hasError = true;
      errs.tickets = true;
    }
    if (!price || !isValidNumber(price)) {
      errs.hasError = true;
      errs.price = true;
    }
    if (!artists.length) {
      errs.hasError = true;
      errs.artists = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
    if (errs.hasError) {
      setErrors(errs);
    } else {
      // si no hay error, guardamos
      onUpdateconcert({
        name,
        date,
        hour,
        city,
        maxTickets: tickets,
        ticketPrice: price,
        artists,
        _id: concert?._id,
      });
    }
  };

  return (
    <div>
      <Modal show={show}>
        <div className="update-form">
          <h1>Actualizar concierto</h1>
          <hr />
          <div className="update-form-body">
            <input
              disabled={loading}
              className={errors.name && "error"}
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              disabled={loading}
              className={errors.date && "error"}
              defaultValue={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              disabled={loading}
              className={errors.hour && "error"}
              defaultValue={hour}
              type="time"
              onChange={(e) => setHour(e.target.value)}
            />
            <input
              disabled={loading}
              className={errors.city && "error"}
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              disabled={loading}
              className={errors.tickets && "error"}
              defaultValue={tickets}
              onChange={(e) => setTickets(e.target.value)}
            />
            <input
              disabled={loading}
              className={errors.price && "error"}
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <MultiInput onChange={(value) => setArtists(value)} error={errors.artists} value={artists}/>
          </div>
          <hr />
          <div className="update-form-footer">
            <button disabled={loading} onClick={() => onCloseModal()}>
              Cerrar
            </button>
            <button disabled={loading} onClick={validateConcertAndSave}>
              {" "}
              {loading && <CustomSpinner />}Actualizar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateconcertModal;
