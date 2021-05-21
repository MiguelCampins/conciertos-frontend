import { Modal } from "react-bootstrap";
import React from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

const Modalthanks = ({ show, setShowThanks }) => {
    
  const history = useHistory();

  const redirect = () => {
    setShowThanks(false);
    history.push("/")
  }
  return (
    <div>
      <Modal show={show}>
        <div className="my-modal">
          <h3>Gracias por su compra!</h3>
          <hr />
          <button onClick={redirect}>Aceptar</button>
        </div>
      </Modal>
    </div>
  );
};

export default Modalthanks;
