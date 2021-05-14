import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import "./index.css";

const CreateConcertModal = ({show, onCloseModal, onCreateConcert}) => {
    const [ name, setName ] = useState();
    const [ date, setDate ] = useState();
    const [ city, setCity ] = useState();
    const [ tickets, setTickets ] = useState();
    const [ ticketPrice, setTicketPrice] = useState();
    const [ artists, setArtists ] = useState([]);

    return (
        <div>
            <Modal show={show}>
                <div className="concert-form">
                    <h1>Crear concierto</h1>
                    <hr/>
                    <div className="concert-body">
                        <input placeholder="Nombre" type="text" onChange={(e)=>setName(e.target.value)}/>
                        <input type="date" onChange={(e)=> setDate(e.target.value)}/>
                        <input placeholder="Ciudad" type="text" onChange={(e)=> setCity(e.target.value)}/>
                        <input placeholder="Numero entradas" type="" onChange={(e)=> setTickets(e.target.value)}/>
                        <input placeholder="Precio" type="" onChange={(e)=> setTicketPrice(e.target.value)}/>
                        <input placeholder="Artistas" type="" onChange={(e)=> setArtists(e.target.value)}/>
                    </div>
                    <hr/>
                    <div className="concert-footer">
                        <button onClick={()=> onCloseModal()}>Cerrar</button>
                        <button onClick={()=> onCreateConcert({name, date, city, maxTickets:tickets, ticketPrice, artists})}>Crear</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default CreateConcertModal;