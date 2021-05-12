import { getRoles } from "../../../utils/api/apiConcert";
import React, { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

const CreateUserModal = ({ show, onCloseModal, onCreateUser }) => {

  const[ name, setName ] = useState();
  const[ surnames, setSurnames ] = useState();
  const[ email, setEmail ] = useState();
  const[ password, setPassword ] = useState();
  const[ phone, setPhone ] = useState();
  const[ city, setCity ] = useState();
  const[ rol, setRol ] = useState();
  const[ roles, setRoles ] = useState([]);

  useEffect(()=>{
    getRoles()
      .then((foundRoles)=>{
        setRoles(foundRoles);
      })
      .catch((err) => {
        console.warn(err);
      });
  },[]);

  useEffect(()=>{
    console.log(rol)
  },[rol])

  return (
    <div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Crear usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <input placeholder="Nombre" type="text" onChange={(e) => setName(e.target.value)} />
        </Row>
        <Row>
          <input placeholder="Apellidos" type="text" onChange={(e) => setSurnames(e.target.value)} />
        </Row>
        <Row>
          <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
        </Row>
        <Row>
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </Row>
        <Row>
          <input placeholder="Telefono" type="text" onChange={(e) => setPhone(e.target.value)} />
        </Row>
        <Row>
          <input placeholder="Ciudad" type="text" onChange={(e) => setCity(e.target.value)} />
        </Row>
        <select name="role" onChange={(e) => setRol(e.currentTarget.value)}>
          {roles && roles.map((role) => (
            <option value={role._id}>{role.name}</option>
          ))}
        </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> onCloseModal()}>Cerrar</Button>
          <Button variant="primary" onClick={() => onCreateUser({name, surnames, email, password, phone, city, userRoleId:rol})}>Crear usuario</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
