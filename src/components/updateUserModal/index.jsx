import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./index.css";

const UpdateUserModal = ({ show, onCloseModal, user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [surnames, setSurnames] = useState(user.surnames);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [validationError, setValidationError ] = useState(false);

  const validateUserAndSave = () => {
    let hasError = false;
    // validamos que están todos los campos
    if(!name || !surnames || !email || !phone || !city ) {
      hasError = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
    if(hasError) {
      setValidationError(true);
    } else {
      // si no hay error, guardamos
      onUpdateUser({ name, surnames, email, phone, city, _id: user?._id,})
    }
  }; 
  
  return (
    <div>
      <Modal show={show}>
        <div className="update-form">
          <h1>Actualizar usuario</h1>
          <hr />
          <div className="update-form-body">
            <input
              defaultValue={user.name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              defaultValue={user.surnames}
              onChange={(e) => setSurnames(e.target.value)}
            />
            <input
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              defaultValue={user.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              defaultValue={user.city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {validationError && <p style={{color:'red'}}>Error de validacion!!</p>}
          <hr />
          <div className="update-form-footer">
            <button onClick={() => onCloseModal()}>Cerrar</button>
            <button onClick={validateUserAndSave}>Actualizar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
