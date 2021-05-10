import React, { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

const UpdateUserModal = ({show, onCloseModal, userUpdate}) => {

    return (
        <div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Actualizar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <input placeholder={userUpdate.name} />
        </Row>
        <Row>
          <input placeholder="Email" />
        </Row>
        <Row>
          <input placeholder="Password"/>
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