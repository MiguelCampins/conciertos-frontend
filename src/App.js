import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Login from "../src/pages/login";
import Home from "../src/pages/home";
import User from "./pages/user";
import BackofficeUser from "./pages/backofficeUser";
import Navbar from "./components/panel/navBar";
import { ROLES } from "./utils/constants";


const App = () => {

  const [user , setUser] = useState(JSON.parse(localStorage.getItem('user')));

  /**
   * Esta función te mira si hay usuario y si el rol es admin, y si hay te devuelve el componente que toca. Sino te lleva al home.
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

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} user={user && user.name} logOut={logOut}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={redirectPrivate} />
        <Route exact path="/user" render={() => redirectPublic(<User />)} />
        <Route exact path="/backofficeUser" render={() => redirectAdmin(<BackofficeUser />)}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
