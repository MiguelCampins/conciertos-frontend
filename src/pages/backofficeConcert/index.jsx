import React, { useEffect, useState } from "react";
import { getConcerts, createConcert, deleteConcert, updateConcert,} from "../../utils/api/apiConcert";
import CreateConcertModal from "../../components/createConcertModal";
import "./index.css";
import TableConcert from "../../components/tableConcert";
import UpdateconcertModal from "../../components/updateConcertModal";

const BackofficeConcerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [showCreateConcertModal, setShowCreateConcertModal] = useState(false);
  const [showUpdateConcertModal, setShowUpdateConcertModal] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState();

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
    setShowUpdateConcertModal(false);
    setSelectedConcert();
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

  const onDeleteConcert = (user, index) => {
    deleteConcert(user._id)
      .then((resp) => {
        //Hacemos una copia de los conciertos
        const newConcerts = [...concerts];
        //Sabemos cual es el concierto con el indice y lo borramos
        newConcerts.splice(index, 1);
        //seteamos los nuevos conciertos
        setConcerts(newConcerts);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const onUpdateconcert = (concert) => {
    const {name, date, city, maxTickets, ticketPrice, artists, _id} = concert;
      if(name && date && city && maxTickets && ticketPrice && artists && _id){
        updateConcert(concert)
        .then((resp) => {
          setShowUpdateConcertModal(false);
          const newConcerts = [...concerts];
          const index = newConcerts.findIndex(concert => concert._id === selectedConcert._id);
          newConcerts.splice(index, resp);
          setConcerts(newConcerts);
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
        <TableConcert
          concerts={concerts && concerts}
          onDeleteConcert={onDeleteConcert}
          onSelectConcert={(con) => {
            setSelectedConcert(con);
            setShowUpdateConcertModal(true);
          }}
        />
      </div>
      {showCreateConcertModal && (
        <CreateConcertModal
          show={showCreateConcertModal}
          onCloseModal={onCloseModal}
          onCreateConcert={onCreateConcert}
        />
      )}
      {showUpdateConcertModal && (
        <UpdateconcertModal
          show={showUpdateConcertModal}
          onCloseModal={onCloseModal}
          concert={selectedConcert}
          onUpdateconcert={onUpdateconcert}
        />
      )}
    </div>
  );
};

export default BackofficeConcerts;
