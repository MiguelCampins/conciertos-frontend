import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import "./index.css";
import CustomSpinner from "../../components/spinner";
import VisibilityIcon from "@material-ui/icons/Visibility";

const PasswordModal = ({
  show,
  onCancel,
  onUpdatePassword,
  id,
  passworInvalid,
  loading,
}) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);

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
    if (!newPasswordConfirm) {
      errs.hasErr = true;
      errs.newPasswordConfirm = true;
    }
    if (newPassword !== newPasswordConfirm) {
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

  const togglePasswordVisiblity = (event) => {
    if (event.type === "mousedown") {
      setPasswordShown(true);
    } else {
      setPasswordShown(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onCancelAndResetInput}>
        <h3>Cambio de contraseña</h3>
        <hr />
        <div className="my-modal-body">
          <label htmlFor="password-one">Contraseña actual*</label>
          <div className="password-input" style={errors.password && {border:"2px solid red"}}>
            <input
              id="password-one"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            ></input>
            <VisibilityIcon
              onMouseDown={togglePasswordVisiblity}
              onMouseUp={togglePasswordVisiblity}
              style={{ color: "grey", width: "20px", cursor: "pointer" }}
            />
          </div>
          {passworInvalid && <span>Contraseña incorrecta</span>}
          <label htmlFor="password-two">Nueva contraseña*</label>
          <input
            className={
              errors.newPassword || errors.comparePassword ? "error" : ""
            }
            id="password-two"
            type="password"
            value={newPassword}
            onChange={(e) => setNewpassword(e.target.value)}
            disabled={loading}
          ></input>
          <label htmlFor="password-confirm">Confirmar nueva contraseña*</label>
          <input
            className={
              errors.newPasswordConfirm || errors.comparePassword ? "error" : ""
            }
            id="password-confirm"
            type="password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            disabled={loading}
          />
        </div>
        <hr />
        <div className="my-modal-footer">
          <button disabled={loading} onClick={onCancelAndResetInput}>
            Cancelar
          </button>
          <button disabled={loading} onClick={validatePassword}>
            {loading && <CustomSpinner />}Cambiar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PasswordModal;
