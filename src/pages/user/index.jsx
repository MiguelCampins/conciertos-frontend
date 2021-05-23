import React, { useState } from "react";
import "./index.css";
import Footer from "../../components/footer";
import EditUser from "../../components/userEdit";
import UserTickets from "../../components/userTickets";
import {updateUser } from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const MODES = {
  conciertos: "conciertos",
  editarPerfil: "editar",
  entradas: "entradas",
};

const User = () => {
  const [mode, setMode] = useState(MODES.editarPerfil);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  const onUpdateUser = (user) => {
    const { name, surnames, email, phone, city, _id } = user;
    if (name && surnames && email && phone && city && _id) {
      updateUser(user)
        .then((resp) => {})
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <div className="user-header-left">
          <div className="user-header-left-text">
            <img alt="img" src={logo} />
            <span>Bienvenido</span>
            <span>{user.name}</span>
          </div>
        </div>
        <div className="user-header-right">
          {mode === MODES.editarPerfil && <h2>Mi perfil</h2>}
          {mode === MODES.entradas && <h2>Entradas</h2>}
        </div>
      </div>
      <div className="user-body">
        <div className="user-body-left-container">
          <div className="user-body-left">
            <button onClick={() => setMode(MODES.editarPerfil)}>
              <span>Editar perfil</span>
            </button>
            <button onClick={() => setMode(MODES.entradas)}>
              <span>Entradas</span>
            </button>
            <button onClick={() => logOut()}>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
        <div className="user-body-right">
          {mode === MODES.editarPerfil && (
            <EditUser onUpdateUser={onUpdateUser} user={user && user} />
          )}
          {mode === MODES.entradas && <UserTickets />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
