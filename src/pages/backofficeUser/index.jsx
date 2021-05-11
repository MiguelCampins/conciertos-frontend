import React, { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers } from "../../utils/api/apiConcert";
import CreateUserModal from "./createUserModal";
import TableUsers from "./tableUser/tableUser";
import UpdateUserModal from "./updateUserModal";
import "./index.css";

const BackofficeUser = () => {
  const [users, setUsers] = useState([]);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [userUpdate, setUserUpdate] = useState();

  useEffect(() => {
    getUsers()
      .then((foundusers) => {
        setUsers(foundusers);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const onCloseModal = () => {
    setShowCreateUserModal(false);
    setShowUpdateUserModal(false);
  };

  const onCreateUser = (name, surnames, email, password, phone, city) => {
    if (!name || !surnames || !email || !password || !phone || !city) {
      alert("Faltan datos");
    } else {
      createUser(name, surnames, email, password, phone, city)
        .then((resp) => {
          const newUsers = [...users];
          newUsers.push(resp);
          setUsers(newUsers);
          setShowCreateUserModal(false);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  const onDeleteUser = (user, index) => {
    
    deleteUser(user._id)
      .then((resp) => {
        const newUsers = [...users];
        newUsers.splice(index, 1);
        setUsers(newUsers);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const onUpdateUser = (user) => {
    setShowUpdateUserModal(true);
    setUserUpdate(user);
    console.log(user)
  };

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
          user={userUpdate && userUpdate}
        />
      )}
        <div className="table">
          <TableUsers
            users={users && users}
            onDeleteUser={onDeleteUser}
            onUpdateUser={onUpdateUser}
          />
      </div>
    </div>
  );
};

export default BackofficeUser;
