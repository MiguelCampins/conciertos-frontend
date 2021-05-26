import React, { useState } from "react";
import { isValidEmail, isValidPhone, isValidstring } from "../../utils/functions";
import "./index.css";

const UserEdit = ({ user, onUpdateUser, emailDuplicate }) => {
  const [name, setName] = useState(user.name);
  const [surnames, setSurnames] = useState(user.surnames);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [errors, setErrors] = useState({});

  const validateUserAndSave = () => {
    const errs = {};
    // validamos que están todos los campos
    if(!name || !isValidstring(name)) {
      errs.hasError = true;
      errs.name = true;
    }
    if(!surnames || !isValidstring(surnames)){
      errs.hasError = true;
      errs.surnames = true;
    }
    if(!city || !isValidstring(city)){
      errs.hasError = true;
      errs.city = true;
    }
    if(!phone || !isValidPhone(phone)){
      errs.hasError = true;
      errs.phone = true;
    }
    if(!email || !isValidEmail(email)){
      errs.hasError = true;
      errs.email = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
    if(errs.hasError) {
      setErrors(errs);
    } else {
      // si no hay error, guardamos
      setErrors({});
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
        <input className={errors.name && 'error'} defaultValue={name} onChange={(e)=>setName(e.target.value)}></input>
        <span>Apellidos*</span>
        <input className={errors.surnames && 'error'} defaultValue={surnames} onChange={(e)=>setSurnames(e.target.value)}></input>
        <span>Telefono*</span>
        <input className={errors.phone && 'error'} defaultValue={phone} onChange={(e)=>setPhone(e.target.value)}></input>
        <span>Ciudad*</span>
        <input className={errors.city && 'error'} defaultValue={city} onChange={(e)=>setCity(e.target.value)}></input>
        <span>Email*</span>
        <input className={errors.email && 'error'} defaultValue={email} onChange={(e)=>setEmail(e.target.value)}></input>
        {emailDuplicate && <span style={{color:"red"}}>El email ya existe</span>}
        <button onClick={validateUserAndSave}>Enviar</button>
      </div>
    </div>
  );
};

export default UserEdit;
