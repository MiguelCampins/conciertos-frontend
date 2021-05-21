import React, { useState, useEffect } from "react";
import "./index.css";
import Footer from "../../components/footer";
import EditUser from "../../components/userEdit";
import UserTickets from "../../components/userTickets";
import CardConcert from "../../components/cardConcert";
import { getConcerts, updateUser } from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";

const MODES = {
  conciertos: "conciertos",
  editarPerfil: "editar",
  entradas: "entradas",
};

const User = () => {
  const [mode, setMode] = useState(MODES.editarPerfil);
  const [concerts, setConcerts] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const history = useHistory();

  useEffect(() => {
    getConcerts()
      .then((resp) => {
        setConcerts(resp);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  useEffect(()=>{
    console.log(user)
  },[])

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
}

const onUpdateUser = (user) => {
    const {name, surnames, email, phone, city, _id} = user;
     if(name && surnames && email && phone && city && _id ){
        updateUser(user)
        .then((resp) => {
        })
        .catch((err) => {
          console.warn(err);
        });
     } 
};

  return (
    <div className="user-container">
      <div className="user-header">
        <div className="user-header-left">
          <div className="user-header-left-text">
            <img alt="img" />
            <span>Bienvenido</span>
            <span>Usuario</span>
          </div>
        </div>
        <div className="user-header-right">
          {mode === MODES.editarPerfil && <h3>Mi perfil</h3>}
          {mode === MODES.entradas && <h3>Entradas</h3>}
          {mode === MODES.conciertos && <h3>Conciertos</h3>}
        </div>
      </div>
      <div className="user-body">
        <div className="user-body-left">
          <button onClick={() => setMode(MODES.editarPerfil)}>
            <span>Editar perfil</span>
          </button>
          <button onClick={() => setMode(MODES.entradas)}>
            <span>Entradas</span>
          </button>
          <button onClick={() => setMode(MODES.conciertos)}>
            <span>Conciertos</span>
          </button>
          <button onClick={()=>logOut()}><span>Cerrar sesión</span></button>
        </div>
        <div className="user-body-right">
          {mode === MODES.editarPerfil && <EditUser onUpdateUser={onUpdateUser} user={user && user}/>}
          {mode === MODES.entradas && <UserTickets />}
          {mode === MODES.conciertos &&
            concerts &&
            concerts.map((concert, index) => (
              <CardConcert key={index} concert={concert} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
