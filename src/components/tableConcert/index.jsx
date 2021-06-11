import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./index.css";
import ModalConfirmDelete from "../modalConfirmDelete";

const TableConcert = ({ concerts, onDeleteConcert, onSelectConcert, onPublicConcert }) => {
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [concertSelect, setUserSelect] = useState();
  const [index, setIndex] = useState();

  const confirmDelete = (user, index) => {
    onDeleteConcert(user, index);
    setShowDeleteUserModal(false);
  };

  const sunmitDelete = (user, index) => {
    setShowDeleteUserModal(true);
    setUserSelect(user);
    setIndex(index);
  };

  if (concerts && !concerts.length) {
    return <h4>No existen coincidencias...</h4>;
  }
  return (
    <div className="table table-bordered table-hover">
      <table>
        <tbody>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Ciudad</th>
            <th>Entradas</th>
            <th>Precio</th>
            <th>Artistas</th>
          </tr>
          {concerts &&
            concerts.map((concert, index) => (
              <tr key={index}>
                <td>{concert.name}</td>
                <td>{concert.date}</td>
                <td>{concert.hour}</td>
                <td>{concert.city}</td>
                <td>{concert.maxTickets}</td>
                <td>{concert.ticketPrice}</td>
                <td>{concert.artists.map((artist) => artist + " / ")}</td>
                <td>
                  <button onClick={() => sunmitDelete(concert, index)}>
                    <DeleteIcon />
                  </button>
                </td>
                <td>
                  <button onClick={() => onSelectConcert(concert)}>
                    <EditIcon />
                  </button>
                </td>
                <td>
                  <button
                    className={!concert.published ? 'publish' : 'no-publish'}
                    onClick={() =>
                      onPublicConcert({_id: concert._id,published: !concert.published,})}
                  >
                    {!concert.published ? "publicar" : "quitar"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ModalConfirmDelete
        show={showDeleteUserModal}
        setShowDeleteUserModal={setShowDeleteUserModal}
        confirmDelete={confirmDelete}
        item={concertSelect}
        index={index}
      />
    </div>
  );
};

export default TableConcert;
