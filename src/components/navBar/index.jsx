import React, { useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import "./index.css";
import logo from "../../assets/images/logo.png";
import { useHistory } from "react-router-dom";

const Navbar = ({ isLoggedIn, logOut, user }) => {

  const [ isOpen, setIsOpen ] = useState(false);
  const history = useHistory();
  /**
   * Funcion para comprobar si el user del localstorage es admin o no 
   */
  const isUserAdmin = () => {
    if(user?.userRoleId?.name === "administrador"){
      return true;
    }
    return false;
  }
  const logOutAndRedirect = () => {
    logOut();
    history.push("/");
  }

  return (
    <div className="custom-navbar">
      <img alt="logo" src={logo}></img>
      <a className="tittle" href="/"><b>ticketclick</b></a>
      <div className={`navbar-links ${isOpen ? 'navbarOpen' : ''}`}>
      <a href="/">Inicio</a>
        {!isUserAdmin() ? (
        <>
          <a href="/aboutUs">Sobre nosotros</a>
          <a href="/contact">Contacto</a>
          <a href="/user">{user && user.name}</a>
        </>
        ):(
        <>
          <a href="/backofficeUser">Usuarios</a>
          <a href="/backofficeConcert">Conciertos</a>
          <a href="/backofficeSale">Ventas</a>
        </>
        )}
        {!isLoggedIn ? (
        <>
          <a href="/login">Accede</a>
          <a href="/register">Registro</a>
        </>
        ):(
         <>
          <button onClick={()=>logOutAndRedirect()}>Cerrar sesión</button>
        </> 
        )}
      </div>
      <button className="navbar-button" onClick={() => setIsOpen(!isOpen)}><MenuIcon /></button>
    </div>
  );
};

export default Navbar;
