import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import React from "react";
import "./index.css";

const ModalAlert = ({ show, setShowAlert, tittle }) => {
  const history = useHistory();
  const redirect = () => {
    setShowAlert(false);
    history.push("/user");
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
