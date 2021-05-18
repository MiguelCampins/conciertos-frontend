import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./index.css";

const TableConcert = ({ concerts, onDeleteConcert, onSelectConcert }) => {

  return (
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
                <button onClick={()=> { if (window.confirm('Estas seguro que quieres borrar el usuario?')) onDeleteConcert(concert, index)}}>
                  <DeleteIcon />
                </button>
              </td>
              <td>
                <button onClick={()=> onSelectConcert(concert)}>
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
