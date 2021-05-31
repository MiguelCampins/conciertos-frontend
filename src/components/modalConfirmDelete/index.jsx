import { Modal } from "react-bootstrap";
import React from "react";
import "./index.css";

const ModalConfirmDelete = ({ show, confirmDelete, setShowDeleteUserModal,item, index}) => {

  return (
    <Modal show={show}>
      <div className="my-modal-delete">
        <h4>Seguro que quieres borrar</h4>
        <hr />
        <div className="botones">
          <button onClick={()=>confirmDelete(item,index)}>Borrar</button>
          <button onClick={() => setShowDeleteUserModal(false)}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmDelete;
