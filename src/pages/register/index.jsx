import React, { useEffect, useState } from "react";
import { registerUser } from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import "./index.css";
import { getRoles } from "../../utils/api/apiConcert";

const Register = () => {
  const [name, setName] = useState();
  const [surnames, setSurnames] = useState();
  const [city, setCity ] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [roles, setRoles] = useState([]);
  const [validationError, setValidationError ] = useState(false);
  
  const history = useHistory();

  useEffect(()=>{
    getRoles()
      .then((foundRoles) => {
        setRoles(foundRoles);
      })
      .catch((err) => {
        console.warn(err);
      });
  },[]);

  const validateUserAndSave = () => {
    let hasError = false;
    // validamos que estan todos los campos
    if(!name || !surnames || !city || !phone || !email || !password){
      hasError = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
  if(hasError) {
    setValidationError(true);
  } else {
    // si no hay error, guardamos
    onRegister({name, surnames, city, phone, email, password, userRoleId:roles[1]._id})
  }
  };

  const onRegister = (user) => {
    const {name, surnames, city, phone, email, password, userRoleId} = user;
    if(name && surnames && city && phone && email && password && userRoleId){
        registerUser(user)
        .then((resp) => {
            history.push("/login");
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
        <input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
        {validationError && <span style={{color:'red'}}>Error de validacion!!</span>}
        <button onClick={validateUserAndSave}>Registrar</button>
      </div>
    </div>
  );
};

export default Register;
