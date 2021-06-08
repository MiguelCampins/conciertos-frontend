import React, { useEffect, useState } from "react";
import CardConcert from "../../components/cardConcert";
import Footer from "../../components/footer";
import { getFilterConcert } from "../../utils/api/apiConcert";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [concerts, setConcerts] = useState();

  useEffect(() => {
    getFilterConcert()
      .then((resp) => {
        setConcerts(resp);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="tag-entradas">
          <h2>AC/DC</h2>
          <p>Legacy Beast Tour 2022</p>
          <Link to="/concert?id=60a2a8a232b11c1c58ba7918">Entradas</Link>
        </div>
      </div>
      <div className="home-body">
        {concerts &&
          concerts.map((concert, index) => (
            <CardConcert key={index} concert={concert} />
          ))}
      </div>
      <h3>Sobre nosotros</h3>
      <div className="home-about-us">
        <div className="home-about-us-img-wrapper">
          <div className="home-about-us-img" />
        </div>
        <div className="home-about-us-text">
          <p>
            Ticketclick es la empresa española líder en la venta de entradas.
            Somos referentes en el mundo del ocio y la cultura, y ofrecemos la
            mayor variedad de enventos: música, teatro, musicales, cine,
            deporte, parques, ocio infantil, museos, exposiciones, circo, shows
            y todo tipo de espectáculos. Todas nuestras entradas son oficiales y
            distribuidas según acuerdos comerciales directos con los promotores
            / organizadores de los eventos.
          </p>
          <a href="/aboutUs">Mostrar mas</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
