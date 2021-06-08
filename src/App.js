import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "../src/pages/login";
import Home from "../src/pages/home";
import User from "./pages/user";
import BackofficeUser from "./pages/backofficeUser";
import BackofficeConcerts from "./pages/backofficeConcert";
import BackofficeSale from "./pages/backofficeSale";
import Navbar from "./components/navBar";
import { ROLES } from "./utils/constants";
import Register from "./pages/register";
import Concert from "./pages/concert";
import AboutUs from "./pages/aboutUs";
import ScrollRestoration from 'react-scroll-restoration';
import "./styles/index.css";
import Contact from "./pages/contact";
import Cookie from './components/cookie';

const App = () => {

  const [user , setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [cookiesAccepted, setCookiesAccepted ] = useState(false);

  useEffect(() => {
    const actualDate = new Date( Date.now());
    const dateLovalstorage = localStorage.getItem('cookiesAccepted');
    if(actualDate > Date.parse(dateLovalstorage)){
      localStorage.removeItem('cookiesAccepted');
    }else if(localStorage.getItem('cookiesAccepted')){
      setCookiesAccepted(true);
    }
  }, []);

  /**
   * Esta función te comprueba si hay usuario y si el rol es admin, y si hay te devuelve el componente que toca. Sino te lleva al home.
   * @param {*} component
   * @returns
   */
  const redirectAdmin = (component) => {
    let userFromLocalStorage = {...user};
    
    if(!Object.keys(userFromLocalStorage).length){
      userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
      setUser(userFromLocalStorage);
    }
    if (userFromLocalStorage && userFromLocalStorage.userRoleId && userFromLocalStorage.userRoleId.name === ROLES.ADMIN) { // userRoleId existe? si existe miro en name y sino existe devuelvo false.
      return component;
    }
    return <Redirect to="/" />;
  };

  /**
   * Esta función te mira si hay usuario y si hay te devuelve el componente que toca. Sino te lleva al login.
   * @param {*} component
   * @returns
   */
  const redirectPublic = (component) => {
    if (localStorage.getItem("user")) {
      return component;
    }
    return <Redirect to="/login" />;
  };

  /**
   * Esta función te mira si hay usuario y si hay te devuelve el componente que toca. Sino te lleva al login.
   * @param {*} component
   * @returns
   */
  const redirectPrivate = () => {
    if (localStorage.getItem("user")) {
      return <Redirect to="/" />;
    }else 
    return <Login />;
  };

  const isLoggedIn = () => {
    //comprobar si existe uderId y token en local storage
    if(localStorage.getItem("user") && localStorage.getItem("token")){
      return true;
    }
    return false;
  };
  
  const logOut = () => {
     localStorage.removeItem("user");
     localStorage.removeItem("token");
     setUser(null);
}

const onAcceptCookies = () => {
  const newDate = new Date( Date.now() + (1000*60*60*24*365));
  localStorage.setItem('cookiesAccepted', newDate);
  setCookiesAccepted(true);
};

const onHideCookie = () => {
  setCookiesAccepted(true);
};

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn()} user={user} logOut={logOut}/>
      {!cookiesAccepted && <Cookie handleCookie={()=> onAcceptCookies()} onHide={()=> onHideCookie()}/>}
      <ScrollRestoration />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" render={redirectPrivate} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user" render={() => redirectPublic(<User />)} />
        <Route exact path="/backofficeUser" render={() => redirectAdmin(<BackofficeUser />)}/>
        <Route exact path="/backofficeConcert" render={() => redirectAdmin(<BackofficeConcerts />)}/>
        <Route exact path="/backofficeSale" render={() => redirectAdmin(<BackofficeSale />)}/>
        <Route path="/concert" component={Concert}/>
        <Route exact path="/aboutUs" component={AboutUs}/>
        <Route exact path="/contact" component={Contact}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
