import React, { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

const CreateUserModal = ({ show, onCloseModal, onCreateUser }) => {

  const[ name, setName ] = useState();
  const[ email, setEmail ] = useState();
  const[ password, setPassword ] = useState();

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
          <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
        </Row>
        <Row>
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </Row>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> onCloseModal()}>Cerrar</Button>
          <Button variant="primary" onClick={() => onCreateUser(name, email, password)}>Crear usuario</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
