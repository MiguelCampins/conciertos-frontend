import React, { useState } from "react";
import "./index.css";

const EditUser = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [surnames, setSurnames] = useState(user.surnames);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [validationError, setValidationError ] = useState(false);

  const validateUserAndSave = () => {
    let hasError = false;
    // validamos que están todos los campos
    if(!name || !surnames || !email || !phone || !city) {
      hasError = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
    if(hasError) {
      setValidationError(true);
    } else {
      // si no hay error, guardamos
      onUpdateUser({ name, surnames, email, phone, city, _id: user?._id })
    }
  }; 

  return (
    <div className="edit-user-container">
      <h2>Editar mi perfil</h2>
      <p>
        La dirección de correo proporcionada será la dirección de facturación y envío de
        las entradas.
      </p>
      <div className="edit-user-form">
        <span>Nombre*</span>
        <input defaultValue={name} onChange={(e)=>setName(e.target.value)}></input>
        <span>Apellidos*</span>
        <input defaultValue={surnames} onChange={(e)=>setSurnames(e.target.value)}></input>
        <span>Telefono*</span>
        <input defaultValue={phone} onChange={(e)=>setPhone(e.target.value)}></input>
        <span>Ciudad*</span>
        <input defaultValue={city} onChange={(e)=>setCity(e.target.value)}></input>
        <span>Email*</span>
        <input defaultValue={email} onChange={(e)=>setEmail(e.target.value)}></input>
        {validationError && <p style={{color:'red'}}>Error de validacion!!</p>}
        <button onClick={validateUserAndSave}>Enviar</button>
      </div>
    </div>
  );
};

export default EditUser;
