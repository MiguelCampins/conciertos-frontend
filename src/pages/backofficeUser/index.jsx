import React, { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers } from "../../utils/api/apiConcert";
import CreateUserModal from "./createUserModal";
import TableUsers from "./tableUser/tableUser";
import UpdateUserModal from "./updateUserModal";

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

  const onCreateUser = (name, email, password) => {
    if (!name || !email || !password) {
      alert("Faltan datos");
    } else {
      createUser(name, email, password)
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
  };

  return (
    <div>
      <button onClick={() => setShowCreateUserModal(true)}>
        Crear usuario
      </button>
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
      <TableUsers
        users={users && users}
        onDeleteUser={onDeleteUser}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
};

export default BackofficeUser;
