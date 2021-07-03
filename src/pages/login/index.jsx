import React, { useState } from "react";
import { getUserLogin } from "../../utils/api/apiConcert";
import { useHistory, useLocation } from "react-router-dom";
import "./index.css";
import logo from "../../assets/images/logo.png";
import CustomSpinner from "../../components/spinner";
import VisibilityIcon from "@material-ui/icons/Visibility";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [errors, setErrors] = useState({});
  const [sessionError, setSessionError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const { state } = useLocation();
  const history = useHistory();

  const onLogin = (email, password) => {
    if (email && password) {
      setLoading(true);
      setErrors({});
      getUserLogin(email, password)
        .then((resp) => {
          localStorage.setItem("user", JSON.stringify(resp?.user));
          localStorage.setItem("token", resp?.token);
          if (!state || !state.previousUrl) {
            history.push("/backofficeUser");
          }
          history.push(state.previousUrl);
          window.location.reload();
        })
        .catch((err) => {
          console.warn(err);
          setSessionError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const validateUserandSend = () => {
    const errs = {};
    if (!email) {
      errs.hasError = true;
      errs.email = true;
    }
    if (!password) {
      errs.hasError = true;
      errs.password = true;
    }

    if (errs.hasError) {
      setErrors(errs);
    } else {
      onLogin(email, password);
    }
  };

  const togglePasswordVisiblity = (event) => {
    if (event.type === "mousedown") {
      setPasswordShown(true);
    } else {
      setPasswordShown(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-form">
        <div className="login-form">
          <img alt="img" src={logo} />
          <input
            className={errors.email && "error"}
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading}
          />
          <div
            className="input-password"
            style={errors.password && { border: "2px solid red" }}
          >
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="contraseña"
              value={password}
              onChange={(event) => setPasword(event.target.value)}
              disabled={loading}
            />
            <VisibilityIcon
              onMouseDown={togglePasswordVisiblity}
              onMouseUp={togglePasswordVisiblity}
              style={{ color: "grey", width: "20px", cursor: "pointer" }}
            />
          </div>
          {sessionError && (
            <div className="error-login">
              La contraseña o el email son incorrectos
            </div>
          )}
          <button disabled={loading} onClick={validateUserandSend}>
            {loading && <CustomSpinner />} Acceder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
