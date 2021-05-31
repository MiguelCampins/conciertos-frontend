import React from "react";
import logo from "../../assets/images/logo.png";
import "./index.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-logo">
        <img alt="logo" src={logo} />
        <h3>TicketClick</h3>
      </div>
      <div className="footer-info">
        <h5>Contáctanos</h5>
        <span>Llamar:+34871000000</span>
        <span>Móvil:+34648934000</span>
        <span>Email: sales@TicketClick.com</span>
      </div>
      <div className="footer-info">
        <h5>Dónde nos encontrarás?</h5>
        <span>Calle Wallaby 42, sidney</span>
        <div className="iconos">
        <a href="https://es-es.facebook.com"><FacebookIcon/></a>
        <a href="https://www.instagram.com"><InstagramIcon/></a>
        <a href="https://outlook.live.com"><MailOutlineIcon/></a>
        <a href="https://github.com"><GitHubIcon/></a>  
        </div>
      </div>
      <div className="footer-info">
        <h5>Política de privacidad</h5>
        <span>Protección de datos</span>
        <span>Mas info+</span>
      </div>
    </div>
  );
};

export default Footer;
