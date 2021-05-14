import React, { useEffect, useState } from "react";
import { getConcerts, createConcert } from "../../utils/api/apiConcert";
import CreateConcertModal from "../../components/createConcertModal";
import "./index.css";
import TableConcert from "../../components/tableConcert";

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
  }, [concerts]);

  const onCloseModal = () => {
    setShowCreateConcertModal(false);
  };

  const onCreateConcert = (concert) => {
    const { name, date, city, maxTickets, ticketPrice, artists } = concert;
    if (name && date && city && maxTickets && ticketPrice && artists) {
      createConcert(concert)
      .then((resp) => {
        const newConcerts = [...concerts];
        newConcerts.push(resp);
        setConcerts(newConcerts);
        setShowCreateConcertModal(false);
      })
      .catch((err) => {
        console.warn(err);
      });
    }
  };

  return (
    <div className="concerts-container">
      <div className="concert-header">
        <h1>Conciertos</h1>
        <button onClick={() => setShowCreateConcertModal(true)}>
          Crear Concierto
        </button>
      </div>
      <div className="table table-bordered table-hover">
        <TableConcert concerts={concerts && concerts}/>
      </div>
      {showCreateConcertModal && (
        <CreateConcertModal
          show={showCreateConcertModal}
          onCloseModal={onCloseModal}
          onCreateConcert={onCreateConcert}
        />
      )}
    </div>
  );
};

export default BackofficeConcerts;
