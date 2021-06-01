import React, { useEffect, useState } from "react";
import "./index.css";
import Footer from "../../components/footer";
import UserEdit from "../../components/userEdit";
import UserTickets from "../../components/userTickets";
import {
  getFilterSale,
  updatePassword,
  updateUser,
} from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import PersonIcon from "@material-ui/icons/Person";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ModalAlert from "../../components/modalAlert";
import ThereAreNotTickets from "../../components/thereAreNotTickets";

const MODES = {
  conciertos: "conciertos",
  editarPerfil: "editar",
  entradas: "entradas",
};

const User = () => {
  const [mode, setMode] = useState(MODES.entradas);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [emailDuplicate, setEmailDuplicate] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getFilterSale(user._id)
      .then((resp) => {
        setSales(resp);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  useEffect(() =>{
    if(user){
      localStorage.setItem("user", JSON.stringify(user))
    }
  },[user])

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  const onUpdateUser = (user) => {
    const { name, surnames, email, phone, city, _id } = user;
    if (name && surnames && email && phone && city && _id) {
      updateUser(user)
        .then((resp) => {
          setUser(resp);
          setShowModal(true);
        })
        .catch((err) => {
          if (err.response.data.message.includes("email")) {
            setEmailDuplicate(true);
          } else {
            console.warn(err);
          }
        });
    }
  };

  const renderSales = () => {
    if (sales?.length) {
      return sales.map((sale, index) => (
        <UserTickets key={index} sale={sale} />
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
          {mode === MODES.editarPerfil && <h2>Mi perfil</h2>}
          {mode === MODES.entradas && <h2>Entradas</h2>}
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
            />
          )}
          {mode === MODES.entradas && renderSales()}
        </div>
      </div>
      <ModalAlert
        tittle="Usuario actualizado"
        show={showModal}
        setShowAlert={setShowModal}
      />
      <Footer />
    </div>
  );
};

export default User;
