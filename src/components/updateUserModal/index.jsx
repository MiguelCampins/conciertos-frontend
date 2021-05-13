import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./index.css";

const UpdateUserModal = ({show, onCloseModal, user, onUpdateUser}) => {

  const[ name, setName ] = useState(user.name);
  const[ surnames, setSurnames ] = useState(user.surnames);
  const[ email, setEmail ] = useState(user.email);
  const[ phone, setPhone ] = useState(user.phone);
  const[ city, setCity ] = useState(user.city);
 
    return (
        <div>
      <Modal show={show}>
        <div className="update-form">
        <h1>Actualizar usuario</h1>
        <hr/> 
        <div className="update-form-body">
          <input defaultValue={user.name} onChange={(e) => setName(e.target.value)}/>
          <input defaultValue={user.surnames} onChange={(e)=>setSurnames(e.target.value)}/>
          <input defaultValue={user.email} onChange={(e)=>setEmail(e.target.value)}/>
          <input defaultValue={user.phone} onChange={(e)=>setPhone(e.target.value)}/>
          <input defaultValue={user.city} onChange={(e)=>setCity(e.target.value)}/>
        </div>
        <hr/>
        <div className="update-form-footer">
          <button variant="secondary" onClick={()=> onCloseModal()}>Cerrar</button>
          <button variant="primary" onClick={()=> onUpdateUser({name, surnames, email, phone, city, _id: user?._id })}>Actualizar</button>
        </div>  
       </div>   
      </Modal>
    </div>
    )
}

export default UpdateUserModal;