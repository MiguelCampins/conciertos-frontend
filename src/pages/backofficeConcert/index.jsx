import React, { useEffect, useState } from "react";
import CardConcertModal from "../../components/cardConcertBackoffice";
import { getConcerts } from "../../utils/api/apiConcert";
import CreateConcertModal from "../../components/createConcertModal";
import "./index.css";

const BackofficeConcerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [showCreateConcertModal, setShowCreateConcertModal] = useState(false);

  useEffect(() => {
    getConcerts()
      .then((resp) => {
          setConcerts(resp);
      })
      .catch((err) => {
        console.warn(err);
      });
  },[]);

  return (
    <div className="concerts-container">
      <div className="concert-header">
        <h1>Conciertos</h1>
        <button onClick={() => setShowCreateConcertModal(true)}>Crear Concierto</button>
      </div>
      <div className="concert-body">
        <CardConcertModal concerts={concerts && concerts} />
      </div>
      {showCreateConcertModal && <CreateConcertModal show={showCreateConcertModal}/>}
    </div>
  );
};

export default BackofficeConcerts;
