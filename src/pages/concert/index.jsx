import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createSale, getConcert, getRemainingTickets } from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import imgDefault from "../../assets/images/pien-muller-Fh-Q-xfdh_o-unsplash.jpg";
import "./index.css";
import BuyTicketModal from "../../components/buyTicketModal";
import Footer from "../../components/footer";

const Concert = () => {
  const [concert, setConcert] = useState();
  const [maxTickets, setMaxTickets] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [showModalToBuyTickets, setShowModalToBuyTickets] = useState(false);

  const params = new URLSearchParams(useLocation().search);
  const history = useHistory();

  useEffect(()=> {
    const _id = params.get("id");
    Promise.all([getConcert(_id),getRemainingTickets(_id)])
      .then((resp) => {
        setConcert(resp[0]);
        setMaxTickets(resp[1]);
      })
      .catch((err) => {
        console.warn(err);
      });
  });

  const onAreYouRegistered = () => {
    if(maxTickets <= 0 || maxTickets < numTickets){
      alert("entradas agotadas")
      //Comprobar si es usuario
    }else if (localStorage.getItem("user") && localStorage.getItem("token")) {
      //mostrar modal para intoducir datos de pago
      setShowModalToBuyTickets(true);
    } else {
      history.push("/login");
    }
  };

  const onBuyTickets = (sale) => {
    const {country, street, city, postalCode, region, targetNum, date, cvv} = sale;
    if(country && street && city && postalCode && region && targetNum && date && cvv){
      //cogemos el usuario del localStorage
      let user = JSON.parse(localStorage.getItem("user"));
     //Crear una venta en la base de datos
     createSale({quantity:numTickets, unitPrice:concert.ticketPrice,concertId:concert._id,userId:user._id})
      .then((resp) =>{
      })
      .catch((err) => {
        console.warn(err);
      });
    }
    setShowModalToBuyTickets(false);
  };

  const onCloseModal = () => {
    setShowModalToBuyTickets(false);
  };

  const formatDate = (date) => {
    let splitString = date.split("-");
    let reverseArray = splitString.reverse();
    let joinArray = reverseArray.join("-");
    return joinArray;
};

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
        <hr />
        {!showInfo ? (
          <div className="concierto-info">
            <div>
              <span>
                Dia {concert && formatDate(concert.date)} a las {concert && concert.hour}
              </span>
              <span>En la ciudad de {concert && concert.city}</span>
            </div>
            <span>Precio {concert && concert.ticketPrice} euros</span>
            <input type="number" min="1" defaultValue="1" onChange={(e) => setNumTickets(e.target.value)}/>
            <div>
              <button
                className="btn btn-primary" onClick={() => onAreYouRegistered()}>Comprar
              </button>
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
        <hr />
      </div>
      <BuyTicketModal
        show={showModalToBuyTickets}
        onCloseModal={onCloseModal}
        onBuyTickets={onBuyTickets}
        numTickets={numTickets && numTickets}
        ticketPrice={concert && concert.ticketPrice}
      />
      <Footer />
    </div>
  );
};

export default Concert;