import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "../src/pages/login";
import Home from "../src/pages/home";
import User from "./pages/user";
import BackofficeUser from "./pages/backofficeUser";
import Navbar from "./components/panel/navBar";

const App = () => {

  /**
   * Esta función te mira si hay usuario y si el rol es admin, y si hay te devuelve el componente que toca. Sino te lleva al home.
   * @param {*} component
   * @returns
   */
  const redirectAdmin = (component) => {
    if (
      localStorage.getItem("userId") &&
      localStorage.getItem("userRole") === "admin"
    ) {
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
    if (localStorage.getItem("userId")) {
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
    if (localStorage.getItem("userId")) {
      return <Redirect to="/" />;
    }
    return <Login />;
  };

  const isLoggedIn = () => {

  }
  
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={redirectPrivate} />
        <Route exact path="/user" render={() => redirectPublic(<User />)} />
        <Route
          exact
          path="/backofficeUser"
          render={() => redirectAdmin(<BackofficeUser />)}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
