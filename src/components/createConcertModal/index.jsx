import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import { isValidNumber, isValidstring } from '../../utils/functions';
import "./index.css";

const CreateConcertModal = ({show, onCloseModal, onCreateConcert}) => {
    const [ name, setName ] = useState();
    const [ date, setDate ] = useState();
    const [ hour, setHour ] = useState();
    const [ city, setCity ] = useState();
    const [ tickets, setTickets ] = useState();
    const [ ticketPrice, setTicketPrice] = useState();
    const [ artists, setArtists ] = useState([]);
    const [errors, setErrors ] = useState({});

    const validateConcertAndSave = () => {
        const errs = {};
        // validamos que están todos los campos
        if(!name) {
          errs.hasError = true;
          errs.name = true;
        }
        if(!date) {
          errs.hasError = true;
          errs.date = true;
        }
        if(!hour) {
          errs.hasError = true;
          errs.hour = true;
        }
        if(!city || !isValidstring(city)) {
          errs.hasError = true;
          errs.city = true;
        }
        if(!tickets || !isValidNumber(tickets)){
          errs.hasError = true;
          errs.tickets = true;
        }
        if(!ticketPrice || !isValidNumber(ticketPrice)){
          errs.hasError = true;
          errs.ticketPrice = true;
        }
        if(!artists.length){
          errs.hasError = true;
          errs.artists = true;
        }
        // si hay alguno que falta ponemos que hay un error de validacion
        if(errs.hasError) {
          setErrors(errs);
        } else {
          // si no hay error, guardamos
          onCreateConcert({name, date,hour, city, maxTickets:tickets, ticketPrice, artists:artists.split(",")})
        }
      }; 

    return (
        <div>
            <Modal show={show}>
                <div className="concert-form">
                    <h1>Crear concierto</h1>
                    <hr/>
                    <div className="concert-body">
                        <input className={errors.name && 'error'} placeholder="Nombre" type="text" onChange={(e)=>setName(e.target.value)}/>
                        <input className={errors.date && 'error'} type="date" onChange={(e)=> setDate(e.target.value)}/>
                        <input className={errors.hour && 'error'} type="time" onChange={(e)=> setHour(e.target.value)}/>
                        <input className={errors.city && 'error'} placeholder="Ciudad" type="text" onChange={(e)=> setCity(e.target.value)}/>
                        <input className={errors.tickets && 'error'} placeholder="Numero entradas" type="" onChange={(e)=> setTickets(e.target.value)}/>
                        <input className={errors.ticketPrice && 'error'} placeholder="Precio" type="" onChange={(e)=> setTicketPrice(e.target.value)}/>
                        <input className={errors.artists && 'error'} placeholder="Artistas" type="" onChange={(e)=> setArtists(e.target.value)}/>
                    </div>
                    <hr/>
                    <div className="concert-footer">
                        <button onClick={()=> onCloseModal()}>Cerrar</button>
                        <button onClick={validateConcertAndSave}>Crear</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default CreateConcertModal;