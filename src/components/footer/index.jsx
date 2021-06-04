import React from "react";
import logo from "../../assets/images/logo.png";
import "./index.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { ExternalLink } from 'react-external-link';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-logo">
        <img alt="logo" src={logo} />
        <h3>TicketClick</h3>
      </div>
      <div className="footer-info">
        <h5>Contáctanos</h5>
        <span>Lamar:+34 971 472 145</span>
        <a href="tel:+34649211654">Móvil:+34 649 211 654</a>
        <a href="mailto:sales@TicketClick.com">Email: sales@TicketClick.com</a>
      </div>
      <div className="footer-info">
        <h5>Dónde nos encontrarás?</h5>
        <ExternalLink href="https://www.google.com/maps/@-33.7555248,150.6036152,17.26z"><span>Calle Wallaby 42, sidney</span></ExternalLink>
        <div className="iconos">
        <ExternalLink href="https://es-es.facebook.com"><FacebookIcon/></ExternalLink>
        <ExternalLink href="https://www.instagram.com"><InstagramIcon/></ExternalLink>
        <ExternalLink href="https://outlook.live.com"><MailOutlineIcon/></ExternalLink>
        <ExternalLink href="https://github.com"><GitHubIcon/></ExternalLink>  
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
