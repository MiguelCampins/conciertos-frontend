import React, { useEffect, useState } from "react";
import {
  getConcerts,
  createConcert,
  deleteConcert,
  updateConcert,
} from "../../utils/api/apiConcert";
import CreateConcertModal from "../../components/createConcertModal";
import "./index.css";
import TableConcert from "../../components/tableConcert";
import UpdateconcertModal from "../../components/updateConcertModal";
import Search from "../../components/search";

const BackofficeConcerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [showCreateConcertModal, setShowCreateConcertModal] = useState(false);
  const [showUpdateConcertModal, setShowUpdateConcertModal] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState();
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false)
  
  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");
  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    getConcerts()
      .then((resp) => {
        setConcerts(resp);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [loading, publish]);

  const onCloseModal = () => {
    setShowCreateConcertModal(false);
    setShowUpdateConcertModal(false);
    setSelectedConcert();
  };

  const onCreateConcert = (concert) => {
    const { name, date, city, maxTickets, ticketPrice, artists, hour } =
      concert;
    if (name && date && city && maxTickets && ticketPrice && artists && hour) {
      setLoading(true);
      createConcert(concert)
        .then((resp) => {
          const newConcerts = [...concerts];
          newConcerts.push(resp);
          setConcerts(newConcerts);
          setShowCreateConcertModal(false);
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setLoading(false);
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
    const { name, date, hour, city, maxTickets, ticketPrice, artists, _id } =
      concert;
    if (
      name &&
      date &&
      hour &&
      city &&
      maxTickets &&
      ticketPrice &&
      artists &&
      _id
    ) {
      setLoading(true);
      updateConcert(concert)
        .then((resp) => {
          setShowUpdateConcertModal(false);
          const newConcerts = [...concerts];
          const index = newConcerts.findIndex(
            (concert) => concert._id === selectedConcert._id
          );
          newConcerts.splice(index, resp);
          setConcerts(newConcerts);
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onPublicConcert = (concert) => {
    const { published, _id } = concert;
    updateConcert(concert)
      .then((resp) => {
        if(!publish){
          setPublish(true);
        }
        setPublish(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const filterConcerts = (concerts, query) => {
    if(!query){
      return concerts;
    }
    return concerts.filter((concert) => {
      const concertName = concert.name.toLowerCase();
      return concertName.includes(query);
    });
  };

  const filteredConcerts = filterConcerts(concerts, query);
  
  return (
    <div className="concerts-container">
      <div className="concert-header">
        <h1>Conciertos</h1>
        <button onClick={() => setShowCreateConcertModal(true)}>
          Crear Concierto
        </button>
      </div>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} action="/backofficeConcert" placeholder="Concierto"/>
          <TableConcert
            concerts={filteredConcerts}
            onPublicConcert={onPublicConcert}
            onDeleteConcert={onDeleteConcert}
            onSelectConcert={(con) => {
              setSelectedConcert(con);
              setShowUpdateConcertModal(true);
            }}
          />
      {showCreateConcertModal && (
        <CreateConcertModal
          show={showCreateConcertModal}
          onCloseModal={onCloseModal}
          onCreateConcert={onCreateConcert}
          loading={loading}
        />
      )}
      {showUpdateConcertModal && (
        <UpdateconcertModal
          show={showUpdateConcertModal}
          onCloseModal={onCloseModal}
          concert={selectedConcert}
          onUpdateconcert={onUpdateconcert}
          loading={loading}
        />
      )}
    </div>
  );
};

export default BackofficeConcerts;
