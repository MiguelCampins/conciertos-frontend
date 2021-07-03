import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  isValidNumber,
  isValidNumberTarget,
  isValidstring,
  isValidNumberCvv,
  isValidDate
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
  disabled,
}) => {
  const [name, setName] = useState();
  const [targetNum, setTargetNum] = useState([]);
  const [date, setDate] = useState([]);
  const [cvv, setCvv] = useState();
  const [errors, setErrors] = useState({});

  const resetModal = () => {
    setTargetNum([]);
    setDate([]);
    setCvv();
    setName();
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
    if (!name || !isValidstring(name)) {
      errs.hasError = true;
      errs.name = true;
    }
    if (!targetNum || !isValidNumberTarget(targetNum)) {
      errs.hasError = true;
      errs.targetNum = true;
    }
    if (!date || !isValidDate(date)) {
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
        targetNum,
        date,
        cvv,
        name,
      });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onCloseModalAndResetErrors}>
        <div className="my-modal-container">
          <div className="my-modal-card">
            <div className="my-modal-map">
            <div className="my-modal-card-content">
              <span>Visa Electron</span>
              <div className="chip">
              </div>
              <div className="my-modal-card-number">
                <span>
                  {!targetNum.length ? "XXXX" : targetNum.slice(0, 4)}
                </span>
                <span>
                  {!targetNum.length ? "XXXX" : targetNum.slice(4, 8)}
                </span>
                <span>
                  {!targetNum.length ? "XXXX" : targetNum.slice(8, 12)}
                </span>
                <span>
                  {!targetNum.length ? "XXXX" : targetNum.slice(12, 16)}
                </span>
              </div>
              <div className="my-modal-card-name">
                <span>{!name ? "FULL NAME" : name}</span>
              </div>
              <div className="my-modal-card-footer">
                <span>{!date.length ? "01/02" : date.slice(0,2) + "/" + date.slice(2,4)}</span>
                <span>{!cvv ? "cvv: XXX" : `cvv: ${cvv}`}</span>
                <div className="my-modal-card-footer-logo" />
              </div>
            </div>
            </div>
          </div>
          <div className="my-modal-inputs">
            <label>Numero de targeta</label>
            <input
              type="number"
              disabled={disabled}
              className={errors.targetNum && "error"}
              value={targetNum}
              placeholder="XXXX XXXX XXXX XXXX"
              onChange={(e) => setTargetNum(e.target.value.slice(0, 16))}
            />
            <label>Nombre del titular</label>
            <input
              disabled={disabled}
              className={errors.name && "error"}
              value={name}
              placeholder="Nombre Titular"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="my-modal-inputs-two">
              <div className="my-modal-inputs-left">
                <label>Expira</label>
                <input
                 type="number"
                  disabled={disabled}
                  className={errors.date && "error"}
                  value={date}
                  placeholder="MM/YY"
                  onChange={(e) => setDate(e.target.value.slice(0, 4))}
                />
              </div>
              <div className="my-modal-inputs-right">
                <label>Codigo seguridad</label>
                <input
                  type="number"
                  disabled={disabled}
                  className={errors.cvv && "error"}
                  value={cvv}
                  placeholder="XXX"
                  onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                />
              </div>
            </div>
          </div>
          <div className="my-modal-buttons">
            <button disabled={disabled} onClick={validateSaleAndSave}>
              {loading && <CustomSpinner />}
              {`Pagar ${calculatePrice()} €`}
            </button>
            <button disabled={disabled} onClick={onCloseModalAndResetErrors}>
              Cancelar pago
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BuyTicketModal;
