import React, { useEffect, useState } from "react";
import "./index.css";

const Home = () => {
  return (
    <div>
      <div className="home-header">
        <div className="tag-entradas">
          <h2>Concierto</h2>
          <p>
            Con Armin van Buuren, David Guetta, Bob Sinclair, Mónica naranjo,Texas y Don Diablo
          </p>
          <a href="/entradas">Entradas</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
