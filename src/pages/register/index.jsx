import React, { useEffect, useState } from "react";
import { registerUser } from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import "./index.css";
import logo from "../../assets/images/logo.png";
import { getRoles } from "../../utils/api/apiConcert";
import { isValidEmail, isValidPhone, isValidstring } from "../../utils/functions";
import CustomSpinner from "../../components/spinner";

const Register = () => {
  const [name, setName] = useState();
  const [surnames, setSurnames] = useState();
  const [city, setCity ] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [ loading, setLoading ] = useState(false);

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
    const errs = {};
    // validamos que estan todos los campos
    if(!name ||!isValidstring(name)){
      errs.hasError = true;
      errs.name = true;
    }
    if(!surnames || !isValidstring(surnames)){
      errs.hasError = true;
      errs.surnames = true;
    }
    if(!city || !isValidstring(city)){
      errs.hasError = true;
      errs.city = true;
    }
    if(!phone || !isValidPhone(phone)){
      errs.hasError = true;
      errs.phone = true;
    }
    if(!email || !isValidEmail(email)){
      errs.hasError = true;
      errs.email = true;
    }
    if(!password){
      errs.hasErrors = true;
      errs.password = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
  if(errs.hasError) {
    setErrors(errs)
  } else {
    // si no hay error, guardamos
    onRegister({name, surnames, city, phone, email, password, userRoleId:roles[1]._id})
  }
  };

  const onSetLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const onRegister = (user) => {
    const {name, surnames, city, phone, email, password, userRoleId} = user;
    if(name && surnames && city && phone && email && password && userRoleId){
      onSetLoading();
      setLoading(true);
        registerUser(user)
        .then((resp) => {
            history.push("/login");
        })
        .catch((err) => {
          if(err.response.data.message.includes('email')){
            setEmailDuplicate(true);
          } else {
            console.warn(err);
          }
          });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <img alt="img" src={logo}/>
        <input className={errors.name && 'error'} placeholder="nombre" onChange={(e)=>setName(e.target.value)} />
        <input className={errors.surnames && 'error'} placeholder="apellidos" onChange={(e)=>setSurnames(e.target.value)} />
        <input className={errors.city && 'error'} placeholder="ciudad" onChange={(e)=>setCity(e.target.value)} />
        <input className={errors.phone && 'error'} placeholder="telefono" onChange={(e)=>setPhone(e.target.value)} />
        <input className={errors.email && 'error'} placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
        {emailDuplicate && <span>El email ya existe</span>}
        <input className={errors.password && 'error'} placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={validateUserAndSave}>{loading && <CustomSpinner/>}Registrar</button>
      </div>
    </div>
  );
};

export default Register;
