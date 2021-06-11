import React, { useState } from "react";
import {isValidEmail,isValidPhone,isValidstring,} from "../../utils/functions";
import "./index.css";
import image from "../../assets/images/pngegg.png";
import PasswordModal from "../passwordModal";
import { updatePassword } from "../../utils/api/apiConcert";
import CustomSpinner from "../../components/spinner";

const UserEdit = ({user, onUpdateUser, emailDuplicate,setEmailDuplicate, loading, disabled}) => {
  const [name, setName] = useState(user.name);
  const [surnames, setSurnames] = useState(user.surnames);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [errors, setErrors] = useState({});
  const [dissabled, setDissabled] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passworInvalid, setPassworInvalid] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const validateUserAndSave = () => {
    const errs = {};
    // validamos que están todos los campos
    if (!name || !isValidstring(name)) {
      errs.hasError = true;
      errs.name = true;
    }
    if (!surnames || !isValidstring(surnames)) {
      errs.hasError = true;
      errs.surnames = true;
    }
    if (!city || !isValidstring(city)) {
      errs.hasError = true;
      errs.city = true;
    }
    if (!phone || !isValidPhone(phone)) {
      errs.hasError = true;
      errs.phone = true;
    }
    if (!email || !isValidEmail(email)) {
      errs.hasError = true;
      errs.email = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
    if (errs.hasError) {
      setErrors(errs);
    } else {
      // si no hay error, guardamos
      setDissabled(true);
      setErrors({});
      onUpdateUser({ name, surnames, email, phone, city, _id: user?._id });
    }
  };

  const onDisable = () => {
    setDissabled(true);
    setName(user.name);
    setSurnames(user.surnames);
    setEmail(user.email);
    setPhone(user.phone);
    setCity(user.city);
    setEmailDuplicate(false);
    setErrors({});
  };

  const onCancelPasswordModal = () => {
    setShowPasswordModal(false);
    setPassworInvalid(false);
  };

  const onUpdatePassword = (id, password, newPasword) => {
    setPasswordLoading(true)
    updatePassword(id, password, newPasword)
      .then((resp) => {
        setShowPasswordModal(false);
        setPassworInvalid(false);
      })
      .catch((err) => {
        if (err.response.data.message.includes("Invalid params")) {
          setPassworInvalid(true);
        } else {
          console.warn(err);
        }
      })
      .finally(()=>{
        setPasswordLoading(false);
      })
  };


  return (
    <>
      <div className="edit-user-container">
        <div className="edit-user-top">
          <div className="edit-user-img">
            <img alt="img" src={image} />
          </div>
          <div className="edit-user-text">
            <h2>Editar mi perfil</h2>
            <p>
              La dirección de correo proporcionada será la dirección de
              facturación y envío de las entradas.
            </p>
          </div>
        </div>

        <div className="edit-user-form">
          <div className="edit-user-form-left">
            <label htmlFor="name">Nombre*</label>
            <input
              disabled={dissabled}
              id="name"
              className={errors.name ? "error" : ""}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label htmlFor="surnames">Apellidos*</label>
            <input
              disabled={dissabled}
              id="surnames"
              className={errors.surnames ? "error" : ""}
              value={surnames}
              onChange={(e) => setSurnames(e.target.value)}
            ></input>
            <label htmlFor="phone">Telefono*</label>
            <input
              disabled={dissabled}
              id="phone"
              className={errors.phone ? "error" : ""}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div className="edit-user-form-right">
            <label htmlFor="city">Ciudad*</label>
            <input
              disabled={dissabled}
              id="city"
              className={errors.city ? "error" : ""}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <label htmlFor="email">Email*</label>
            <input
              disabled={dissabled}
              id="email"
              className={errors.email ? "error" : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {emailDuplicate ? (<span>El email ya existe</span>) : ""}
            <PasswordModal
              show={showPasswordModal}
              onCancel={onCancelPasswordModal}
              onUpdatePassword={onUpdatePassword}
              id={user._id}
              passworInvalid={passworInvalid}
              loading={passwordLoading}
            />
          </div>
        </div>
        <div className="edit-user-form-buttons">
          {!dissabled ? (
            <>
              <button className="button-cancel" onClick={onDisable}>
                Cancelar
              </button>
              <button className="button-confirm" onClick={validateUserAndSave}>
                Enviar
              </button>
            </>
          ) : (
            <>
            <button disabled={disabled} className="button-edit" onClick={() => setDissabled(false)}>
            { loading && <CustomSpinner/>}
              Editar perfil
            </button>
            <button disabled={disabled} className="button-password" onClick={() => setShowPasswordModal(true)}>
              Cambiar contraseña
            </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserEdit;
