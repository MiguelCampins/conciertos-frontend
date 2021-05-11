import React from "react";

const TableUsers = ({ users, onDeleteUser, onUpdateUser }) => {

  return (
        <table>
            <tbody>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Ciudad</th>
                </tr>
                {users && users.map((user,index) => (
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.surnames}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.city}</td>
                        <td><button onClick={()=> { if (window.confirm('Estas seguro que quieres borrar el usuario?')) onDeleteUser(user, index)}}>Borrar</button></td>
                        <td><button onClick={()=> onUpdateUser(user)}>Editar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>     
  );
};

export default TableUsers;
