import React, { useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import "./index.css";

const Navbar = ({ isLoggedIn, logOut, user }) => {

  const [ isOpen, setIsOpen ] = useState(false);

  /**
   * Funcion para comprobar si el user del localstorage es admin o no 
   */
  const isUserAdmin = () => {
    const userRole = JSON.parse(localStorage.getItem('user'));
    if(userRole && userRole.userRoleId?.name === "admin"){
      return true;
    }
    return false;
  }

  return (
    <div className="custom-navbar">
      <img alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/RPC-JP_Logo.png/900px-RPC-JP_Logo.png"></img>
      <div className={`navbar-links ${isOpen ? 'navbarOpen' : ''}`}>
        <a href="/">Home</a>
        <a href="/contact">Contacto</a>
        <a href="/contact">Contacto</a>
        <a href="/login">Login</a>
        <a href="/contact">Register</a>
      </div>
      <button className="navbar-button" onClick={() => setIsOpen(!isOpen)}><MenuIcon /></button>
    </div>
  );
};

export default Navbar;
