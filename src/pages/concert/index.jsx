import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { useParams } from 'react-router-dom';
import {createSale, getConcert, getRemainingTickets} from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import imgDefault from "../../assets/images/pien-muller-Fh-Q-xfdh_o-unsplash.jpg";
import BuyTicketModal from "../../components/buyTicketModal";
import Footer from "../../components/footer";
import BuyTicketTarget from "../../components/buyTicketTarget";
import "./index.css";
import ModalAlert from "../../components/modalAlert";
import CarouselConcert from "../../components/carouselConcert";

const Concert = () => {
  const [concert, setConcert] = useState();
  const [maxTickets, setMaxTickets] = useState();
  const [numTickets, setNumTickets] = useState(1);
  const [showModalToBuyTickets, setShowModalToBuyTickets] = useState(false);
  const [showAlertThanks, setShowAlertThanks] = useState(false);
  const [showAlertSpend, setShowAlertSpend] = useState(false);
  const [showAlertMaxLimit, setShowAlertMaxLimit] = useState(false);

  const params = new URLSearchParams(useLocation().search);
  // const {id} = useParams();
  const history = useHistory();

  useEffect(() => {
    const _id = params.get("id");
    Promise.all([getConcert(_id), getRemainingTickets(_id)])
      .then((resp) => {
        setConcert(resp[0]);
        setMaxTickets(resp[1]);
      })
      .catch((err) => {
        console.warn(err);
      }); 
  },[]);

  const onAreYouRegistered = (tickets) => {
    if (maxTickets === 0 ) {
         setShowAlertSpend(true);
      //Comprobar si es usuario
    }else if(maxTickets < tickets){
         setShowAlertMaxLimit(true);
    } else if (localStorage.getItem("user") && localStorage.getItem("token")) {
      //mostrar modal para intoducir datos de pago
      setShowModalToBuyTickets(true);
      setNumTickets(tickets);
    } else {
      history.push("/login");
    }
  };

  const onBuyTickets = (sale) => {
    const { country, street, city, postalCode, region, targetNum, date, cvv } = sale;
    if ( country && street && city && postalCode && region && targetNum && date && cvv ) {
      //cogemos el usuario del localStorage
      let user = JSON.parse(localStorage.getItem("user"));
      //Crear una venta en la base de datos
      createSale({quantity: numTickets,unitPrice: concert.ticketPrice,concertId: concert._id,userId: user._id,})
        .then((resp) => {
          setShowModalToBuyTickets(false);
          setMaxTickets(maxTickets - numTickets);
          setShowAlertThanks(true);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
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
    <div className="event-container">
      <div className="event-header">
        <div className="event-header-left">
          <div className="event-header-left-info">
            <h1>{concert && concert.name}</h1>
            <span>{concert && formatDate(concert.date)}</span>
            <span>Precio € {concert && concert.ticketPrice}</span>
            <a href="#entrada">Comprar entradas</a>
          </div>
        </div>
        <div className="event-header-right">
        {concert && concert.imageUrl ? (<img alt="img" src={concert.imageUrl} />):(<img alt="img" src={imgDefault}/>)}
        </div>
      </div>
      <div className="event-body-info">
        <h2>Informacion del evento</h2>
        <div className="line"></div>
        <p>
          Cu nam labores lobortis definiebas, ei aliquyam salutatus persequeris
          quo, cum eu nemore fierent dissentiunt. Per vero dolor id, vide
          democritum scribentur eu vim, pri erroribus temporibus ex. Euismod
          molestie offendit has no. Quo te semper invidunt quaestio, per
          vituperatoribus sadipscing ei, partem aliquyam sensibus in cum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </p>
        <p>
          Virtute equidem ceteros in mel. Id volutpat neglegentur eos. Eu eum
          facilisis voluptatum, no eam albucius verterem. Sit congue platonem
          adolescens ut. Offendit reprimique et has, eu mei homero imperdiet.
        </p>
      </div>
      <div id="entrada"></div>
        <BuyTicketTarget i
          setNumTickets={setNumTickets}
          maxTickets={maxTickets}
          onAreYouRegistered={onAreYouRegistered}
          numTickets={numTickets}
          concert={concert}
        />
      <CarouselConcert imagesUrl={concert && concert.images}/>
      <BuyTicketModal
        show={showModalToBuyTickets}
        onCloseModal={onCloseModal}
        onBuyTickets={onBuyTickets}
        numTickets={numTickets}
        ticketPrice={concert && concert.ticketPrice}
      />
      <ModalAlert tittle="Gracias por su compra!" show={showAlertThanks} setShowAlert={setShowAlertThanks}/>
      <ModalAlert tittle="Entadas agotadas" show={showAlertSpend} setShowAlert={setShowAlertSpend}/>
      <ModalAlert tittle="No hay suficientes entradas" show={showAlertMaxLimit} setShowAlert={setShowAlertMaxLimit}/>
      <Footer />
    </div>
  );
};

export default Concert;
