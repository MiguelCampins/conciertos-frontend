import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getConcert } from "../../utils/api/apiConcert";
import imgDefault from "../../assets/images/pien-muller-Fh-Q-xfdh_o-unsplash.jpg";
import "./index.css";

const Concert = ({ location }) => {
  const [concert, setConcert] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const params = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const _id = params.get("id");
    getConcert(_id)
      .then((resp) => {
        setConcert(resp);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <div className="concierto-container">
      <div className="concierto-header">
        {concert && concert.imageUrl ? (
          <img alt="img" src={concert && concert.imageUrl} />
        ) : (
          <img alt="img" src={imgDefault} />
        )}
        <h3>Entradas para {concert && concert.name}</h3>
      </div>
      <div className="concierto-nav">
        <button onClick={() => setShowInfo(true)}>Info</button>
        <button onClick={() => setShowInfo(false)}>Evento</button>
      </div>
      <div className="concierto-body">
      <hr/>
        {!showInfo ? (
          <div className="concierto-info">
            <div>
              <span>Dia {concert && concert.date} a las {concert && concert.hour}</span>
              <span>En la ciudad de {concert && concert.city}</span>
            </div>
            <span>Precio {concert && concert.ticketPrice} euros</span>
            <div>
              <buton className="btn btn-primary">Comprar</buton>
            </div>
          </div>
        ) : (
          <>
            <h4>Información de {concert && concert.name}</h4>
            <p>
              No his munere interesset. At soluta accusam gloriatur eos, ferri
              commodo sed id, ei tollit legere nec. Eum et iudico graecis, cu
              zzril instructior per, usu at augue epicurei. Saepe scaevola
              takimata vix id. Errem dictas posidonium id vis, ne modo affert
              incorrupte eos.
            </p>
            <p>
              Lorem salutandi eu mea, eam in soleat iriure assentior. Tamquam
              lobortis id qui. Ea sanctus democritum mei, per eu alterum
              electram adversarium. Ea vix probo dicta iuvaret, posse epicurei
              suavitate eam an, nam et vidit menandri. Ut his accusata
              petentium.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi.
            </p>
          </>
        )}
        <hr/>
      </div>
    </div>
  );
};

export default Concert;
