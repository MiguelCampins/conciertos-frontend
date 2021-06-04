import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  isValidNumber,
  isValidNumberTarget,
  isValidstring,
  isValidNumberCvv,
} from "../../utils/functions";
import CustomSpinner from "../../components/spinner";
import "./index.css";

const BuyTicketModal = ({
  show,
  onBuyTickets,
  numTickets,
  ticketPrice,
  onCloseModal,
  loading,
  disabled
}) => {
  const [country, setCountry] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [region, setRegion] = useState();
  const [targetNum, setTargetNum] = useState();
  const [date, setDate] = useState();
  const [cvv, setCvv] = useState();
  const [errors, setErrors] = useState({});

  const resetModal = () => {
    setCountry();
    setStreet();
    setCity();
    setPostalCode();
    setRegion();
    setTargetNum();
    setDate();
    setCvv();
  };

  const onCloseModalAndResetErrors = () => {
    onCloseModal();
    resetModal();
    setErrors({});
  };

  const calculatePrice = () => {
    let total = numTickets * ticketPrice;
    return total;
  };

  const validateSaleAndSave = () => {
    const errs = {};
    // validamos que están todos los campos
    if (!country || !isValidstring(country)) {
      errs.hasError = true;
      errs.country = true;
    }
    if (!street) {
      errs.hasError = true;
      errs.street = true;
    }
    if (!city || !isValidstring(city)) {
      errs.hasError = true;
      errs.city = true;
    }
    if (!postalCode || !isValidNumber(postalCode)) {
      errs.hasError = true;
      errs.postalCode = true;
    }
    if (!region || !isValidstring(region)) {
      errs.hasError = true;
      errs.region = true;
    }
    if (!targetNum || !isValidNumberTarget(targetNum)) {
      errs.hasError = true;
      errs.targetNum = true;
    }
    if (!date) {
      errs.hasError = true;
      errs.date = true;
    }
    if (!cvv || !isValidNumberCvv(cvv)) {
      errs.hasError = true;
      errs.cvv = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
    if (errs.hasError) {
      setErrors(errs);
    } else {
      // si no hay error, guardamos
      resetModal();
      onBuyTickets({
        country,
        street,
        city,
        postalCode,
        region,
        targetNum,
        date,
        cvv,
      });
    }
  };

  return (
    <div>
      <Modal show={show}>
        <div className="buy-form">
          <h1>Comprar entradas</h1>
          <hr />
          <div className="buy-form-body">
            <div className="buy-form-body-inputs">
              <span>País</span>
              <input
                className={errors.country && "error"}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={disabled}
              />
              <span>Dirección</span>
              <input
                className={errors.street && "error"}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                disabled={disabled}
              />
              <span>Ciudad</span>
              <input
                className={errors.city && "error"}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={disabled}
              />
              <span>Código postal</span>
              <input
                className={errors.postalCode && "error"}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                type="number"
                disabled={disabled}
              />
              <span>Provincia</span>
              <input
                className={errors.region && "error"}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                disabled={disabled}
              />
              <span>Número targeta</span>
              <input
                className={errors.targetNum && "error"}
                value={targetNum}
                onChange={(e) => setTargetNum(e.target.value.slice(0, 16))}
                type="number"
                disabled={disabled}
              />
              <span>Fecha caducidad</span>
              <input
                className={errors.date && "error"}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="month"
                disabled={disabled}
              />
              <span>CVV</span>
              <input
                className={errors.cvv && "error"}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                type="number"
                disabled={disabled}
              />
            </div>
          </div>
          <div className="buy-form-body-total">
            <span className="total">
              <b>Total:</b> {calculatePrice()} euros
            </span>
          </div>
          <hr />
          <div className="buy-form-footer">
            <button disabled={disabled} onClick={onCloseModalAndResetErrors}>Anular</button>
            <button disabled={disabled} onClick={validateSaleAndSave}>{ loading && <CustomSpinner/>}Comprar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BuyTicketModal;
