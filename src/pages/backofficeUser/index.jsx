import React, { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers, getRoles, updateUser } from "../../utils/api/apiConcert";
import CreateUserModal from "./createUserModal";
import TableUsers from "./tableUser/tableUser";
import UpdateUserModal from "./updateUserModal";
import "./index.css";

const BackofficeUser = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    //Llamada a la base de datos de los usuarios y de los roles
      Promise.all([getUsers(),getRoles()])
        .then((resp) => {
          //Seteamos los usuarios
          setUsers(resp[0]);
          //Seteamos los roles
          setRoles(resp[1]);
        })
        .catch((err) => {
          console.warn(err);
        });
  }, [users]);

/**
 * Funcion para cerrar los modals. Esto cierra el estate de los dos modales y te limpia el usuario seleccionado.
*/
const onCloseModal = () => {
  setShowCreateUserModal(false);
  setShowUpdateUserModal(false);
  setSelectedUser();
};

  /**
   * Funcion que crea un nuevo usuario y lo mete en base de datos
   * @param {*} user 
   */

  const onCreateUser = (user) => {
    const {name, surnames, email, password, phone, city, userRoleId} = user;
    if (!name || !surnames || !email || !password || !phone || !city || !userRoleId ) {
      alert("Faltan datos");
    } else {
      createUser(user)
        .then((resp) => {
          //Hacemos una copia de los usuarios
          const newUsers = [...users];
          //Introducimos el nuevo usuario en la copia de usuarios
          newUsers.push(resp);
          //Seteamos los nuevos usuarios
          setUsers(newUsers);
          //Cerramos el modal
          setShowCreateUserModal(false);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  /**
   * Funcion para borrar un usuario
   * @param {*} user 
   * @param {*} index 
   */

  const onDeleteUser = (user, index) => {
    
    deleteUser(user._id)
      .then((resp) => {
        //Hacemos una copia de los usuarios
        const newUsers = [...users];
        //Sabemos quie es el usuario con el indice y lo borramos
        newUsers.splice(index, 1);
        //seteamos los nuevos usuarios
        setUsers(newUsers);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const onUpdateUser = (user) =>{
    const {name, surnames, email, phone, city, _id } = user;
      if(!name || !surnames || !email || !phone || !city ){
        alert('Faltan datos')
      }else{
        updateUser(user)
        .then((resp) => {
          setShowUpdateUserModal(false);
          // modificar el usuario en el array principal
          const newUsers = [...users];
          const index = newUsers.findIndex(user => user._id === selectedUser._id);
          newUsers.splice(index, resp);
          setUsers(newUsers);
        })
        .catch((err) => {
          console.warn(err);
        });
      }
  }

  return (
    <div className="users-container">
      <div className="footer">
        <h1>Users</h1>
        <button onClick={() => setShowCreateUserModal(true)}>
          Crear usuario
        </button>
      </div>
      {showCreateUserModal && (
        <CreateUserModal
          show={showCreateUserModal}
          onCloseModal={onCloseModal}
          onCreateUser={onCreateUser}
        />
      )}
      {showUpdateUserModal && (
        <UpdateUserModal
          show={showUpdateUserModal}
          onCloseModal={onCloseModal}
          user={selectedUser}
          onUpdateUser={onUpdateUser}
        />
      )}
        <div className="table">
          <TableUsers
            users={users && users}
            roles={roles && roles}
            onDeleteUser={onDeleteUser}
            onSelectUser={(usr) => {
              setSelectedUser(usr);
              setShowUpdateUserModal(true);
            }}
          />
      </div>
    </div>
  );
};

export default BackofficeUser;
