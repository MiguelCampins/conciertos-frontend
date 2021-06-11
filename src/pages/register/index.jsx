import React, { useEffect, useState } from "react";
import { registerUser } from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import "./index.css";
import logo from "../../assets/images/logo.png";
import { getRoles } from "../../utils/api/apiConcert";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidstring,
} from "../../utils/functions";
import CustomSpinner from "../../components/spinner";
import VisibilityIcon from "@material-ui/icons/Visibility";

const Register = () => {
  const [name, setName] = useState();
  const [surnames, setSurnames] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getRoles()
      .then((foundRoles) => {
        setRoles(foundRoles);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const validateUserAndSave = () => {
    const errs = {};
    // validamos que estan todos los campos
    if (!name || !isValidstring(name)) {
      errs.hasError = true;
      errs.name = true;
    }
    if (!surnames || !isValidstring(surnames)) {
      errs.hasError = true;
      errs.surnames = true;
    }
    if (!city || !isValidstring(city)) {
      errs.hasError = true;
      errs.city = true;
    }
    if (!phone || !isValidPhone(phone)) {
      errs.hasError = true;
      errs.phone = true;
    }
    if (!email || !isValidEmail(email)) {
      errs.hasError = true;
      errs.email = true;
    }
    if (!password || !isValidPassword(password)) {
      errs.hasError = true;
      errs.password = true;
    }
    // si hay alguno que falta ponemos que hay un error de validacion
    if (errs.hasError) {
      setErrors(errs);
    } else {
      // si no hay error, guardamos
      onRegister({
        name,
        surnames,
        city,
        phone,
        email,
        password,
        userRoleId: roles[1]._id,
      });
    }
  };

  const onRegister = (user) => {
    const { name, surnames, city, phone, email, password, userRoleId } = user;
    if (name && surnames && city && phone && email && password && userRoleId) {
      setLoading(true);
      setErrors({});
      registerUser(user)
        .then(() => {
          history.push("/login");
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
        });
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
    <div className="register-container">
      <div className="register-form">
        <img alt="img" src={logo} />
        <input
          disabled={loading}
          className={errors.name && "error"}
          placeholder="nombre"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          disabled={loading}
          className={errors.surnames && "error"}
          placeholder="apellidos"
          onChange={(e) => setSurnames(e.target.value)}
        />
        <input
          disabled={loading}
          className={errors.city && "error"}
          placeholder="ciudad"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          disabled={loading}
          className={errors.phone && "error"}
          placeholder="telefono"
          onChange={(e) => setPhone(e.target.value)}
        />
        {emailDuplicate && (
          <span style={{ color: "red" }}>El email ya existe</span>
        )}
        <input
          disabled={loading}
          className={errors.email && "error"}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Minimo 8 caracteres y un número</span>
        <div
          className="input-password"
          style={errors.password && { border: "2px solid red" }}
        >
          <input
            type={passwordShown ? "text" : "password"}
            disabled={loading}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <VisibilityIcon
            onMouseDown={togglePasswordVisiblity}
            onMouseUp={togglePasswordVisiblity}
            style={{ color: "grey", width: "20px", cursor: "pointer" }}
          />
        </div>
        <button disabled={loading} onClick={validateUserAndSave}>
          {loading && <CustomSpinner />}Registrar
        </button>
      </div>
    </div>
  );
};

export default Register;
