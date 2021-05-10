import React from "react";

const TableUsers = ({ users, onDeleteUser, onUpdateUser }) => {

  return (
        <table>
            <tbody>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Contraseña</th>
                </tr>
                {users && users.map((user,index) => (
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td><button onClick={()=> onDeleteUser(user, index)}>Borrar</button></td>
                        <td><button onClick={()=> onUpdateUser(user)}>Editar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>     
  );
};

export default TableUsers;
