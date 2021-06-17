import React, { useEffect, useState } from "react";
import "./index.css";
import Footer from "../../components/footer";
import UserEdit from "../../components/userEdit";
import UserTickets from "../../components/userTickets";
import { getFilterSale, updateUser } from "../../utils/api/apiConcert";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import PersonIcon from "@material-ui/icons/Person";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ModalAlert from "../../components/modalAlert";
import ThereAreNotTickets from "../../components/thereAreNotTickets";
import UserTicketsList from "../../components/userTicketsList";

const MODES = {
  editarPerfil: "editar",
  entradas: "entradas",
};

const User = () => {
  const [mode, setMode] = useState(MODES.editarPerfil);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTicketsList, setshowticketsList] = useState(false);
  const [numTickets, setNumTickets] = useState();
  const [concertTicket, setConcertTicket] = useState();

  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (state && state.redirectToTickets) {
      setMode(MODES.entradas);
    }
    getFilterSale(user._id)
      .then((resp) => {
        setSales(resp);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  const onUpdateUser = (user) => {
    const { name, surnames, email, phone, city, _id } = user;
    if (name && surnames && email && phone && city && _id) {
      setLoading(true);
      setDisabled(true);
      updateUser(user)
        .then((resp) => {
          setUser(resp);
        })
        .catch((err) => {
          if (err.response.data.message.includes("email")) {
            setEmailDuplicate(true);
          } else {
            console.warn(err);
          }
        })
        .finally(() => {
          setLoading(false);
          setDisabled(false);
          setShowModal(true);
        });
    }
  };

  const redirect = () => {
    history.push("/user");
  };

  const onHandleTickets = (NumSales, concert) => {
    setshowticketsList(true);
    setNumTickets(Array.from(Array(NumSales).keys()));
    setConcertTicket(concert);
  };

  const renderSales = () => {
    if (sales?.length) {
      return sales.map((sale, index) => (
        <UserTickets
          key={index}
          sale={sale}
          onHandleTickets={onHandleTickets}
        />
      ));
    }

    return <ThereAreNotTickets />;
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <div className="user-header-left">
          <div className="user-header-left-text">
            <img alt="img" src={logo} />
            <span>Bienvenido</span>
            <span>{user.name}</span>
          </div>
        </div>
        <div className="user-header-right">
          {mode === MODES.editarPerfil && <h1>Mi perfil</h1>}
          {mode === MODES.entradas && <h1>Entradas</h1>}
        </div>
      </div>
      <div className="user-body">
        <div className="user-body-left-container">
          <div className="user-body-left">
            <button onClick={() => setMode(MODES.editarPerfil)}>
              <PersonIcon />
              <span>Editar perfil</span>
            </button>
            <button onClick={() => setMode(MODES.entradas)}>
              <ConfirmationNumberIcon />
              <span>Entradas</span>
            </button>
            <button onClick={() => logOut()}>
              <ExitToAppIcon />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
        <div className="user-body-right">
          {mode === MODES.editarPerfil && (
            <UserEdit
              onUpdateUser={onUpdateUser}
              user={user && user}
              emailDuplicate={emailDuplicate}
              setEmailDuplicate={setEmailDuplicate}
              loading={loading}
              disabled={disabled}
            />
          )}
          {mode === MODES.entradas && renderSales()}
        </div>
      </div>
      <ModalAlert
        tittle="Usuario actualizado"
        show={showModal}
        setShowAlert={setShowModal}
        onRedirect={redirect}
      />
      <Footer />
      {showTicketsList && (
        <UserTicketsList
          onHandleTickets={setshowticketsList}
          numTickets={numTickets && numTickets}
          concertTicket={concertTicket}
          user={user}
        />
      )}
    </div>
  );
};

export default User;
