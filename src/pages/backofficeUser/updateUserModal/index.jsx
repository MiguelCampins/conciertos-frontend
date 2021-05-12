import React, { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

const UpdateUserModal = ({show, onCloseModal, user, onUpdateUser}) => {

  const[ name, setName ] = useState(user.name);
  const[ surnames, setSurnames ] = useState(user.surnames);
  const[ email, setEmail ] = useState(user.email);
  const[ phone, setPhone ] = useState(user.phone);
  const[ city, setCity ] = useState(user.city);
 
    return (
        <div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Actualizar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <input defaultValue={user.name} onChange={(e) => setName(e.target.value)}/>
        </Row>
        <Row>
          <input defaultValue={user.surnames} onChange={(e)=>setSurnames(e.target.value)}/>
        </Row>
        <Row>
          <input defaultValue={user.email} onChange={(e)=>setEmail(e.target.value)}/>
        </Row>
        <Row>
          <input defaultValue={user.phone} onChange={(e)=>setPhone(e.target.value)}/>
        </Row>
        <Row>
          <input defaultValue={user.city} onChange={(e)=>setCity(e.target.value)}/>
        </Row>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> onCloseModal()}>Cerrar</Button>
          <Button variant="primary" onClick={()=> onUpdateUser({name, surnames, email, phone, city, _id: user?._id })}>Actualizar usuario</Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}

export default UpdateUserModal;