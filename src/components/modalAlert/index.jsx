import { Modal } from "react-bootstrap";
import React from "react";
import "./index.css";

const ModalAlert = ({ show, setShowAlert, tittle, onRedirect }) => {
  
  const redirect = () => {
    setShowAlert(false);
    onRedirect();
  }

  return (
    <div>
      <Modal show={show}>
        <div className="my-modal">
          <h3>{tittle}</h3>
          <hr />
          <button onClick={redirect}>Aceptar</button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAlert;
