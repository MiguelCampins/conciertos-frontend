import React, { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

const UpdateUserModal = ({show, onCloseModal, user}) => {

    return (
        <div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Actualizar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <input defaultValue={user.name}/>
        </Row>
        <Row>
          <input defaultValue={user.surnames} />
        </Row>
        <Row>
          <input defaultValue={user.email}/>
        </Row>
        <Row>
          <input defaultValue={user.phone}/>
        </Row>
        <Row>
          <input defaultValue={user.city}/>
        </Row>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> onCloseModal()}>Cerrar</Button>
          <Button variant="primary" >Actualizar usuario</Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}

export default UpdateUserModal;