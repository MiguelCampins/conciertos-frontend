import React, { useState } from "react";
import { createUser } from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [name, setName] = useState();
  const [surnames, setSurnames] = useState();
  const [city, setCity ] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const history = useHistory();

  const onRegister = (user) => {
    const {name, surnames, city, phone, email, password} = user;
    if(name && surnames && city && phone && email && password){
        createUser(user)
        .then((resp) => {
            history.push("/");
        })
        .catch((err) => {
            console.warn(err);
          });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Registro</h1>
        <input placeholder="nombre" onChange={(e)=>setName(e.target.value)}/>
        <input placeholder="apellidos" onChange={(e)=>setSurnames(e.target.value)} />
        <input placeholder="ciudad" onChange={(e)=>setCity(e.target.value)} />
        <input placeholder="telefono" onChange={(e)=>setPhone(e.target.value)} />
        <input placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
        <input placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={() => onRegister({name, surnames, city, phone, email, password})}>Registrar</button>
      </div>
    </div>
  );
};

export default Register;
