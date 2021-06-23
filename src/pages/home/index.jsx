import React, { useEffect, useState } from "react";
import CardConcert from "../../components/cardConcert";
import CardMini from "../../components/cardMini";
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
          <Link to="/concert?id=60a2a8a232b11c1c58ba7918">ENTRADAS</Link>
        </div>
      </div>
      <div className="home-body-container">
        <div className="home-body">
          {concerts &&
            concerts.map((concert, index) => (
              <CardConcert key={index} concert={concert} />
            ))}
        </div>
        <div className="home-body-right">
          <div className="home-body-right-anuncio">
        
          </div>
          <div className="home-body-right-tittle">
            <h4>
              <b>DESTACADOS</b>
            </h4>
            <div className="line" />
          </div>
          <CardMini
            href="https://www.ticketmaster.es/feature/indiemaster/?int_cmp_name=Indiemaster&int_cmp_id=ES-Home-501&int_cmp_creative=Home-featured-3&tm_link=tm_ccp_Home_featured_Indiemaster"
            src="https://uk.tmconst.com/ccp-salesforce-images/ES/indiemaster19720x405_1.jpg?auto=webp"
            name="Indiemaster"
          />
          <CardMini
            href="https://www.ticketmaster.es/feature/metalmaster/?int_cmp_name=Metalmaster&int_cmp_id=ES-Home-501&int_cmp_creative=Home-featured-4&tm_link=tm_ccp_Home_featured_Metalmaster"
            src="https://uk.tmconst.com/ccp-salesforce-images/ES/metalmaster19720x405.jpg?auto=webp"
            name="Metalmaster"
          />
          <CardMini
            href="https://www.ticketmaster.es/"
            src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2018/06/28/15301762581939.png"
            name="Ticketmaster"
          />
        </div>
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
