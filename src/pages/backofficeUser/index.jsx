import React, { useEffect, useState } from "react";
import { deleteUser, getUsers, getRoles, updateUser, registerUser } from "../../utils/api/apiConcert";
import CreateUserModal from "../../components/createUserModal";
import TableUsers from "../../components/tableUser/tableUser";
import UpdateUserModal from "../../components/updateUserModal";
import "./index.css";
import Search from "../../components/search";

const BackofficeUser = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [emailDuplicate, setEmailDuplicated] = useState(false);
  const [loading, setLoading] = useState(false);

  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");
  const [searchQuery, setSearchQuery] = useState(query || "");

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
  }, [showUpdateUserModal]);

/**
 * Funcion para cerrar los modals. Esto cierra el estate de los dos modales y te limpia el usuario seleccionado.
*/
const onCloseModal = () => {
  setShowCreateUserModal(false);
  setShowUpdateUserModal(false);
  setEmailDuplicated(false)
  setSelectedUser();
};

  /**
   * Funcion que crea un nuevo usuario y lo mete en base de datos
   * @param {*} user 
   */

  const onCreateUser = (user) => {
    const {name, surnames, email, password, phone, city, userRoleId} = user;
    if (!name || !surnames || !email || !password || !phone || !city || !userRoleId ) {
      
    } else {
      setLoading(true);
      registerUser(user)
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
          if(err.response.data.message.includes('email')){
            setEmailDuplicated(true);
          } else {
            console.warn(err);
          }
        })
        .finally(()=>{
          setLoading(false);
        })
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

/**
 * funcion para acualizar un usuario
 * @param {*} user 
 */
  const onUpdateUser = (user) =>{
    const {name, surnames, email, phone, city, _id, userRoleId} = user;
     if(name && surnames && email && phone && city && _id && userRoleId){
       setLoading(true);
        updateUser(user)
        .then((resp) => {
          setShowUpdateUserModal(false);
          // copia de los usuarios
          const newUsers = [...users];
          //comparamos el indice de el usuario seleccionado 
          const index = newUsers.findIndex(user => user._id === selectedUser._id);
          //añadimos a ese usuario la actualizacion
          newUsers.splice(index, resp);
          //seteamos los nuevos usuarios
          setUsers(newUsers);
        })
        .catch((err) => {
          if(err.response.data.message.includes('email')){
            setEmailDuplicated(true);
          } else {
            console.warn(err);
          }
        })
        .finally(()=>{
          setLoading(false);
        })
     } 
  };

  const filterUsers = (users, query) => {
    if(!query){
      return users;
    }
    return users.filter((user) => {
      const userName = user.name.toLowerCase();
      return userName.includes(query);
    });
  };

  const filteredUser = filterUsers(users, query);

  return (
    <div className="users-container">
      <div className="header">
        <h1>Usuarios</h1>
        <button onClick={() => setShowCreateUserModal(true)}>
          Crear usuario
        </button>
      </div>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} action="/backofficeUser" placeholder="Usuario"/>
          <TableUsers
            users={filteredUser}
            roles={roles && roles}
            onDeleteUser={onDeleteUser}
            onSelectUser={(usr) => {
              setSelectedUser(usr);
              setShowUpdateUserModal(true);
            }}
          />
      {showCreateUserModal && (
        <CreateUserModal
          show={showCreateUserModal}
          onCloseModal={onCloseModal}
          onCreateUser={onCreateUser}
          emailDuplicate={emailDuplicate}
          loading={loading}
        />
      )}
      {showUpdateUserModal && (
        <UpdateUserModal
          show={showUpdateUserModal}
          onCloseModal={onCloseModal}
          user={selectedUser}
          onUpdateUser={onUpdateUser}
          emailDuplicate={emailDuplicate}
          loading={loading}
        />
      )} 
    </div>
  );
};

export default BackofficeUser;
