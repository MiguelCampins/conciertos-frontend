import React, { useState } from "react";
import { getUserLogin } from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import "./index.css";
import logo from "../../assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [errors, setErrors] = useState({});
  const [ sessionError, setSessionError ] = useState(false)

  const history = useHistory();

  const onLogin = (email, password) => {
    if(email && password){
      getUserLogin(email, password)
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp?.user));
        localStorage.setItem("token", resp?.token);
        history.push("/backofficeUser");
      })
      .catch((err) => {
        console.warn(err);
        setSessionError(true);
      });
    }
  };

  const validateUserandSend = () => {
    const errs = {};
    if(!email){
      errs.hasError = true;
      errs.email = true;
    }
    if(!password){
      errs.hasError = true;
      errs.password = true;
    }

    if(errs.hasError){
      setErrors(errs);
    }else{
      onLogin(email, password)
    }
  }

  return (
    <div className="login-container">
      <div className="login-container-form">
        <div className="login-form">
          <img alt="img" src={logo} />
          <input
            className={errors.email && 'error'}
            type="text"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className={errors.password && 'error'}
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPasword(event.target.value)}
          />
          {sessionError && (<div className="error-login">La contraseña o el email son incorrectos</div>)}
          <button onClick={validateUserandSend}>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
