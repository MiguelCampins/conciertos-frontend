import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import "./index.css";

const BuyTicketModal = ({show, onBuyTickets, numTickets, ticketPrice, onCloseModal}) => {
    const[country, setCountry] = useState();
    const[street, setStreet] = useState();
    const[city, setCity] = useState();
    const[postalCode, setPostalCode] = useState();
    const[region, setRegion] = useState();
    const[targetNum, setTargetNum] = useState();
    const[date, setDate] = useState();
    const[cvv, setCvv] = useState();
    const[validationError, setValidationError ] = useState(false);

    const calculatePrice = () => {
        let total = numTickets * ticketPrice
        return total;
    };
   
    const validateSaleAndSave = () => {
        let hasError = false;
        // validamos que están todos los campos
        if(!country || !street || !city || !postalCode || !region || !targetNum || !date || !cvv) {
          hasError = true;
        }
        // si hay alguno que falta ponemos que hay un error de validacion
        if(hasError) {
          setValidationError(true);
        } else {
          // si no hay error, guardamos
          onBuyTickets({country, street, city, postalCode, region, targetNum, date, cvv});
        }
      }; 

    return (
        <div>
            <Modal show={show}>
                <div className="buy-form">
                    <h1>Comprar entradas</h1>
                    <hr/>
                    <div className="buy-form-body">
                        <span>País</span><input onChange={(e) => setCountry(e.target.value) }/>
                        <span>Dirección</span><input onChange={(e) => setStreet(e.target.value) }/>
                        <span>Ciudad</span><input onChange={(e) => setCity(e.target.value) }/>
                        <span>Código postal</span><input onChange={(e) => setPostalCode(e.target.value) }/>
                        <span>Provincia</span><input onChange={(e) => setRegion(e.target.value) }/>
                        <span>Número targeta</span><input onChange={(e) => setTargetNum(e.target.value) }/>
                        <span>Fecha caducidad</span><input onChange={(e) => setDate(e.target.value) } type="date"/>
                        <span>CVV</span><input onChange={(e) => setCvv(e.target.value) }/>
                        <span className="total"><b>Total:</b> {calculatePrice()} euros</span>
                    </div>
                    {validationError && <p style={{color:'red'}}>Error de validacion!!</p>}
                    <hr/>
                    <div className="buy-form-footer">
                        <button onClick={() => onCloseModal()}>Anular</button>
                        <button onClick={validateSaleAndSave}>Comprar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default BuyTicketModal;