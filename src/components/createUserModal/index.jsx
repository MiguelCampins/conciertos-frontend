import { getRoles } from "../../utils/api/apiConcert";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./index.css";

const CreateUserModal = ({ show, onCloseModal, onCreateUser }) => {
  const [name, setName] = useState();
  const [surnames, setSurnames] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [rol, setRol] = useState();
  const [roles, setRoles] = useState([]);
  const [validationError, setValidationError ] = useState(false);

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
  let hasError = false;
  // validamos que están todos los campos
  if(!name || !surnames || !email || !password || !phone || !city || !rol) {
    hasError = true;
  }
  // si hay alguno que falta ponemos que hay un error de validacion
  if(hasError) {
    setValidationError(true);
  } else {
    // si no hay error, guardamos
    onCreateUser({name, surnames, email, password, phone, city, userRoleId: rol});
  }
}; 

  return (
    <div>
      <Modal show={show}>
          <div className="create-form">
            <h1>Crear usuario</h1>
            <hr/>
            <div className="create-form-body">
              <input placeholder="Nombre" type="text" onChange={(e) => setName(e.target.value)}/>
              <input placeholder="Apellidos" type="text" onChange={(e) => setSurnames(e.target.value)}/>
              <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)}/>
              <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
              <input placeholder="Telefono" type="text" onChange={(e) => setPhone(e.target.value)}/>
              <input placeholder="Ciudad" type="text" onChange={(e) => setCity(e.target.value)}/>
              <select onChange={(e) => setRol(e.currentTarget.value)}>
                <option disabled selected>-- Tipo de usuario --</option>
                {roles &&
                  roles.map((role, index) => (
                    <option key={index} value={role._id}>{role.name}</option>
                  ))}
              </select>
            </div>
            {validationError && <p style={{color:'red'}}>Error de validacion!!</p>}
            <hr/>
            <div className="create-form-footer">
              <button variant="secondary" onClick={() => onCloseModal()}>Cerrar</button>
              <button variant="primary" onClick={validateUserAndSave}>Crear usuario</button></div>
          </div>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
