import React, { useEffect, useState } from "react";
import CardConcert from "../../components/cardConcert";
import Footer from "../../components/footer";
import { getConcerts } from "../../utils/api/apiConcert";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  const[concerts, setConcerts] = useState();

  useEffect(()=> {
    getConcerts()
      .then((resp) => {
        setConcerts(resp);
      })
      .catch((err) => {
        console.warn(err);
      });
  },[]);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="tag-entradas">
          <h2>RockFestival</h2>
          <p>
            Con Armin van Buuren, David Guetta, Bob Sinclair, Mónica naranjo,Texas y Don Diablo
          </p>
          <button><Link to="/concert?id=60a3a6f56b22992280922b39">Entradas</Link></button>
        </div>
      </div>
      <div className="home-body">
      {concerts && concerts.map((concert, index) => (
        <CardConcert key={index} concert={concert} />
      ))}
      </div>
      <h3>Sobre nosotros</h3>
      <div className="home-about-us">
        <div className="home-about-us-img-wrapper">
          <div className="home-about-us-img" />
        </div>
        <div className="home-about-us-text">
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla faci</p>
          <a href="/aboutUs">Mostrar mas</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
