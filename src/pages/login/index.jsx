import React, { useState } from 'react';
import { getUserLogin } from "../../utils/api/apiConcert";
import { useHistory } from "react-router-dom";
import './index.css';

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [password, setPasword ] = useState('');

    const history = useHistory();

    const onLogin = (email, password) =>{
        if(!email || !password) {
          alert("Faltan datos");
        }else{
          getUserLogin(email, password)
            .then((resp) => {
              localStorage.setItem("user", JSON.stringify(resp?.user));
              localStorage.setItem('token', resp?.token);
              history.push("/backofficeUser");
            })
            .catch((err) => {
              console.warn(err);
            });
        }
      }

    return (
        <div className="login-container">
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="email" onFocus onChange={(event)=> setEmail(event.target.value)}/>
                <input type="password" placeholder="password" onChange={(event)=> setPasword(event.target.value)} />
                <button onClick={() => onLogin(email, password)}>Log in</button>
            </div>
        </div>
    )
} 

export default Login;