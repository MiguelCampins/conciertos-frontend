import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./index.css";
import { updateConcert } from "../../utils/api/apiConcert";
import ModalConfirmDelete from "../modalConfirmDelete";

const TableConcert = ({ concerts, onDeleteConcert, onSelectConcert }) => {

  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [concertSelect, setUserSelect] = useState();
  const [index, setIndex] = useState();

  const onPublicConcert = (concert) => {
    const {published, _id} = concert;
       updateConcert(concert)
       .then((resp) => {

       })
       .catch((err) => {
        console.warn(err);
      });
  };

  const confirmDelete = (user, index) => {
    onDeleteConcert(user, index);
    setShowDeleteUserModal(false);
};

const sunmitDelete = (user,index) =>{
  setShowDeleteUserModal(true)
  setUserSelect(user);
  setIndex(index);
}

  return (
    <>
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
              <td>{concert.artists.map(artist => (artist + " / "))}</td>
              <td>
                <button onClick={()=> sunmitDelete(concert, index)}>
                  <DeleteIcon />
                </button>
              </td>
              <td>
                <button onClick={()=> onSelectConcert(concert)}>
                  <EditIcon />
                </button>
              </td>
              <td>
                <button className="publish" onClick={() => onPublicConcert({_id:concert._id, published:!concert.published})}>{!concert.published ? 'publicar' : 'quitar'}</button>
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
    </>
  );
};

export default TableConcert;
