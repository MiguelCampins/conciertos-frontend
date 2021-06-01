import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import "./index.css";

const PasswordModal = ({
  show,
  onCancel,
  onUpdatePassword,
  id,
  passworInvalid,
}) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = () => {
    const errs = {};
    if (!password) {
      errs.hasErr = true;
      errs.password = true;
    }
    if (!newPassword) {
      errs.hasErr = true;
      errs.newPassword = true;
    }
    if(!newPasswordConfirm){
        errs.hasErr = true;
        errs.newPasswordConfirm = true;
    }
    if(newPassword !== newPasswordConfirm){
        errs.hasErr = true;
        errs.comparePassword = true;
    }
    if (errs.hasErr) {
      setErrors(errs);
    } else {
      // Si no tiene errores , llamamos a la función de actualizar contraseña
      onUpdatePassword(id, password, newPassword);
      setPassword("");
      setNewpassword("");
      setNewPasswordConfirm("");
      setErrors({});
    }
  };

  const onCancelAndResetInput = () => {
    onCancel();
    setPassword("");
    setNewpassword("");
    setNewPasswordConfirm("");
    setErrors({});
  };

  return (
    <>
      <Modal show={show}>
        <h3>Cambio de contraseña</h3>
        <hr/>
        <div className="my-modal-body">
          <label htmlFor="password-one">Contraseña actual*</label>
          <input
            className={errors.password ? "error" : ""}
            id="password-one"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {passworInvalid && <span>Contraseña incorrecta</span>}
          <label htmlFor="password-two">Nueva contraseña*</label>
          <input
            className={errors.newPassword || errors.comparePassword ? "error" : ""}
            id="password-two"
            type="password"
            value={newPassword}
            onChange={(e) => setNewpassword(e.target.value)}
          ></input>
          <label htmlFor="password-confirm">Confirmar nueva contraseña*</label>
          <input
            className={errors.newPasswordConfirm || errors.comparePassword ? "error" : ""}
            id="password-confirm"
            type="password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
        </div>
        <hr />
        <div className="my-modal-footer">
          <button onClick={validatePassword}>Cambiar</button>
          <button onClick={onCancelAndResetInput}>Cancelar</button>
        </div>
      </Modal>
    </>
  );
};

export default PasswordModal;
