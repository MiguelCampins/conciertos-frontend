import React, { useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import "./index.css";
import logo from "../../assets/images/logo.png";

const Navbar = ({ isLoggedIn, logOut, user }) => {

  const [ isOpen, setIsOpen ] = useState(false);

  /**
   * Funcion para comprobar si el user del localstorage es admin o no 
   */
  const isUserAdmin = () => {
    if(user?.userRoleId?.name === "admin"){
      return true;
    }
    return false;
  }


  return (
    <div className="custom-navbar">
      <img alt="logo" src={logo}></img>
      <span>TicketClick</span>
      <div className={`navbar-links ${isOpen ? 'navbarOpen' : ''}`}>
      <a href="/">Home</a>
        {!isUserAdmin() ? (
        <>
          <a href="/contact">Contacto</a>
          <a href="/contact">Contacto</a>
        </>
        ):(
        <>
          <a href="/backofficeUser">Usuarios</a>
          <a href="/backofficeConcert">Conciertos</a>
        </>
        )}
        {!isLoggedIn ? (
        <>
          <a href="/login">Login</a>
          <a href="/contact">Register</a>
        </>
        ):(
         <>
          <span>{user.name}</span>
          <button onClick={()=>logOut()}>Logout</button>
        </> 
        )}
      </div>
      <button className="navbar-button" onClick={() => setIsOpen(!isOpen)}><MenuIcon /></button>
    </div>
  );
};

export default Navbar;
