import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./index.css";

const TableConcert = ({ concerts, onDeleteConcert }) => {

  return (
    <table>
      <tbody>
        <tr>
          <th>Nombre</th>
          <th>Fecha</th>
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
              <td>{concert.city}</td>
              <td>{concert.maxTickets}</td>
              <td>{concert.ticketPrice}</td>
              <td></td>
              <td>
                <button onClick={()=> { if (window.confirm('Estas seguro que quieres borrar el usuario?')) onDeleteConcert(concert, index)}}>
                  <DeleteIcon />
                </button>
              </td>
              <td>
                <button>
                  <EditIcon />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableConcert;
