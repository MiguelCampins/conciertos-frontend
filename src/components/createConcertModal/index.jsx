import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import "./index.css";

const CreateConcertModal = ({show}) => {
    const [ name, setName ] = useState();
    const [ date, setDate ] = useState();
    const [ city, setCity ] = useState();
    const [ tickets, setTickets ] = useState();
    const [ priceTicket, setPriceTicket] = useState();
    const [ artists, setArtists ] = useState([]);

    return (
        <div>
            <Modal show={show}>
                <div className="concert-form">
                    <h1>Crear concierto</h1>
                    <hr/>
                    <div className="concert-body">
                        <input placeholder="Nombre" type="text"></input>
                        <input type="date"></input>
                        <input placeholder="Ciudad" type="text"></input>
                        <input placeholder="Numero entradas" type=""></input>
                        <input placeholder="Precio" type=""></input>
                        <input placeholder="Artistas" type=""></input>
                    </div>
                    <hr/>
                    <div className="concert-footer">
                        <button>Cerrar</button>
                        <button>Crear</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default CreateConcertModal;