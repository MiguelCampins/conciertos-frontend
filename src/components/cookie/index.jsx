import React from "react";
import "./index.css";

const Cookie = ({
  handleCookie,
  onHide
}) => {
  return (
    <>
      <div
        className="cookie-container"
      >
        <div className="cookie-text">
          <p>
            Utilizamos cookies e identificadores propios y de terceros con tu
            consentimiento y/o nuestro interés legítimo, con el propósito de
            almacenar o acceder a información en tu dispositivo, recabar datos
            personales sobre la audiencia para desarrollar y mejorar productos
            así como mostrar y medir anuncios propios y/o de terceros y/o
            contenido personalizados basándonos en tu navegación (por ejemplo
            páginas visitadas).
          </p>
        </div>
        <div className="cookie-buttons">
          <button onClick={handleCookie}>Aceptar</button>
          <button onClick={onHide}>Cancelar</button>
        </div>
      </div>
      <div className="cookie-background"/>
    </>
  );
};

export default Cookie;
