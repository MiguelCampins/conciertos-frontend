import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import "./index.css";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { ExternalLink } from "react-external-link";
import Footer from "../../components/footer";
import { isValidPhone, isValidstring } from "../../utils/functions";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isValidated, setIsvalidated] = useState(false);

  useEffect(() => {
    setName("");
    setPhone("");
    setMessage("");
  }, [errors]);

  const validateForm = () => {
    const errs = {};
    if (!name || !isValidstring(name)) {
      errs.hasErr = true;
      errs.name = true;
    }
    if (!phone || !isValidPhone(phone)) {
      errs.hasErr = true;
      errs.phone = true;
    }
    if (errs.hasErr) {
      setErrors(errs);
      setIsvalidated(false);
    } else {
      setIsvalidated(true);
      setErrors({});
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-img">
        <h1>CONTÁCTANOS</h1>
      </div>
      <div className="contact-body">
        <div className="contact-message">
          <div className={errors.name ? "error" : "contact-input"}>
            <input
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={errors.phone ? "error" : "contact-input"}>
            <input
              placeholder="Telefono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="contact-input">
            <textarea
              placeholder="Mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="contact-message-send">
            <a
              style={{ color: "white" }}
              onClick={validateForm}
              href={
                isValidated
                  ? `mailto:sales@ticketClick.com?subject=Contactacto: ${name}&body= Telephone: ${phone} %0D%0A%0D%0A Message: ${message} %0D%0A%0D%0A`
                  : null
              }
            >
              Enviar mensaje
            </a>
          </div>
        </div>
        <div className="contact-info">
          <div className="contact-info-logo">
            <img alt="img" src={logo} />
          </div>
          <div className="contact-info-telephones">
            <div className="contact-info-telephone">
              <LocalPhoneIcon className="icon" />
              <span>+34-971-472-145</span>
            </div>
            <div className="contact-info-mobile">
              <PhoneIphoneIcon className="icon" />
              <a href="tel:+34649211654">+34-649-211-654</a>
            </div>
          </div>
          <div className="contact-info-email">
            <MailOutlineIcon className="icon" />
            <a href="mailto:sales@TicketClick.com">
              Email: sales@TicketClick.com
            </a>
          </div>
          <div className="contact-info-location">
            <ExternalLink href="https://www.google.com/maps/@-33.7555248,150.6036152,17.26z">
              <LocationOnIcon className="icon" />
            </ExternalLink>
            <ExternalLink href="https://www.google.com/maps/@-33.7555248,150.6036152,17.26z">
              <span>Calle Wallaby 42</span>
            </ExternalLink>
            <ExternalLink href="https://www.google.com/maps/@-33.7555248,150.6036152,17.26z">
              <span>Bloque 2,local 1, 07600</span>
            </ExternalLink>
            <ExternalLink href="https://www.google.com/maps/@-33.7555248,150.6036152,17.26z">
              <span>sidney</span>
            </ExternalLink>
          </div>
        </div>
      </div>
      <iframe
        title="sede"
        width="100%"
        height="600"
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=Select%20Mortgage%20Finance,%20Coughlan%20Road,%20Blaxland%20Nueva%20Gales%20del%20Sur,%20Australia&t=&z=15&ie=UTF8&iwloc=&output=embed"
        scrolling="no"
      ></iframe>
      <Footer />
    </div>
  );
};

export default Contact;
