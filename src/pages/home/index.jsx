import React, { useEffect, useState } from "react";
import CardConcert from "../../components/cardConcert";
import Footer from "../../components/footer";
import { getConcerts } from "../../utils/api/apiConcert";
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
          <h2>Concierto</h2>
          <p>
            Con Armin van Buuren, David Guetta, Bob Sinclair, Mónica naranjo,Texas y Don Diablo
          </p>
          <a href="/concert">Entradas</a>
        </div>
      </div>
      <div className="home-body">
      {concerts && concerts.map((concert, index) => (
        <CardConcert key={index} concert={concert} />
      ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
