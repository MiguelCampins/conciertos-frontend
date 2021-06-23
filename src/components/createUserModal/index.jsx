import { getRoles } from "../../utils/api/apiConcert";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./index.css";
import {
  isValidEmail,
  isValidPhone,
  isValidstring,
} from "../../utils/functions";
import CustomSpinner from "../../components/spinner";

const CreateUserModal = ({
  show,
  onCloseModal,
  onCreateUser,
  emailDuplicate,
  loading,
}) => {
  const [name, setName] = useState();
  const [surnames, setSurnames] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [rol, setRol] = useState();
  const [roles, setRoles] = useState([]);
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
    if (!password) {
      errs.hasError = true;
      errs.password = true;
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
      onCreateUser({
        name,
        surnames,
        email,
        password,
        phone,
        city,
        userRoleId: rol,
      });
    }
  };

  return (
    <div>
      <Modal show={show}>
        <div className="create-form">
          <h1>Nuevo usuario</h1>
          <hr />
          <div className="create-form-body">
            <input
              disabled={loading}
              className={errors.name && "error"}
              placeholder="Nombre"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              disabled={loading}
              className={errors.surnames && "error"}
              placeholder="Apellidos"
              type="text"
              onChange={(e) => setSurnames(e.target.value)}
            />
            <input
              disabled={loading}
              className={errors.email && "error"}
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailDuplicate && <span>Email en uso</span>}
            <input
              disabled={loading}
              className={errors.password && "error"}
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              disabled={loading}
              className={errors.phone && "error"}
              placeholder="Telefono"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              disabled={loading}
              className={errors.city && "error"}
              placeholder="Ciudad"
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
            <select
              disabled={loading}
              className={errors.rol && "error"}
              onChange={(e) => setRol(e.target.value)}
            >
              <option disabled selected>
                -- Tipo de usuario --
              </option>
              {roles &&
                roles.map((role, index) => (
                  <option key={index} value={role._id}>
                    {role.name}
                  </option>
                ))}
            </select>
          </div>
          <hr />
          <div className="create-form-footer">
            <button
              disabled={loading}
              variant="secondary"
              onClick={() => onCloseModal()}
            >
              Cerrar
            </button>
            <button
              disabled={loading}
              variant="primary"
              onClick={validateUserAndSave}
            >
              {loading && <CustomSpinner />}Crear usuario
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
