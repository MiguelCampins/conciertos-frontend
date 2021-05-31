import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./index.css";
import ModalConfirmDelete from "../modalConfirmDelete";

const TableUsers = ({ users, roles, onDeleteUser, onSelectUser }) => {

  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [userSelect, setUserSelect] = useState();
  const [index, setIndex] = useState();
  /**
   * Funcion que compara el rolId de la tabla roles y el rolId de cada usuario  para mostrar nombre del rol
   */
  const rolIdToName = (userRolId) => {
    const userRole = roles.find((role) => role._id === userRolId);
    return userRole?.name;
  };

  const confirmDelete = (user, index) => {
      onDeleteUser(user, index);
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
            <th>Apellido</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Ciudad</th>
            <th>Rol</th>
          </tr>
          {users &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.surnames}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.city}</td>
                <td>{rolIdToName(user.userRoleId)}</td>
                <td>
                  <button onClick={() => sunmitDelete(user, index)}><DeleteIcon /></button>
                </td>
                <td>
                  <button onClick={() => onSelectUser(user)}><EditIcon /></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ModalConfirmDelete
        show={showDeleteUserModal}
        setShowDeleteUserModal={setShowDeleteUserModal}
        confirmDelete={confirmDelete}
        user={userSelect}
        index={index}        
      />
    </>
  );
};

export default TableUsers;
