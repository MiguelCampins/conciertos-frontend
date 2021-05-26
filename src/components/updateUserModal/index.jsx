import React, { useState, useEffect } from "react";
import { getRoles } from "../../utils/api/apiConcert";
import { Modal } from "react-bootstrap";
import "./index.css";
import { isValidEmail, isValidPhone, isValidstring } from "../../utils/functions";

const UpdateUserModal = ({
  show,
  onCloseModal,
  user,
  onUpdateUser,
  emailDuplicate,
}) => {
  const [name, setName] = useState(user.name);
  const [surnames, setSurnames] = useState(user.surnames);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [roles, setRoles] = useState([]);
  const [rol, setRol] = useState();
  const [errors, seterrors] = useState({});

  useEffect(() => {
    getRoles()
      .then((foundRoles) => {
        setRoles(foundRoles);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

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
    if (!rol) {
      errs.hasError = true;
      errs.rol = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
    if (errs.hasError) {
      seterrors(errs);
    } else {
      // si no hay error, guardamos
      onUpdateUser({
        name,
        surnames,
        email,
        phone,
        city,
        _id: user?._id,
        userRoleId: rol,
      });
    }
  };

  return (
    <div>
      <Modal show={show}>
        <div className="update-form">
          <h1>Actualizar usuario</h1>
          <hr />
          <div className="update-form-body">
            <input className={errors.name && 'error'} defaultValue={name} onChange={(e) => setName(e.target.value)}/>
            <input className={errors.surnames && 'error'} defaultValue={surnames} onChange={(e) => setSurnames(e.target.value)}/>
            <input className={errors.email && 'error'} defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
            {emailDuplicate && <span>El email ya esta en uso</span>}
            <input className={errors.phone && 'error'} defaultValue={phone} onChange={(e) => setPhone(e.target.value)}/>
            <input className={errors.city && 'error'} defaultValue={city} onChange={(e) => setCity(e.target.value)}/>
            <select className={errors.rol && 'error'} onChange={(e) => setRol(e.currentTarget.value)}>
              <option disabled selected>--Tipo de usuario</option>
              {roles &&
                roles.map((role, index) => (
                  <option key={index} value={role._id}>
                    {role.name}
                  </option>
                ))}
            </select>
          </div>
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
