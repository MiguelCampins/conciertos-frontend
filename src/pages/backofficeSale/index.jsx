import React, { useEffect, useState } from "react";
import Search from "../../components/search";
import { getConcerts, getSales } from "../../utils/api/apiConcert";
import "./index.css";

const BackofficeSale = () => {
  const [concerts, setConcerts] = useState([]);
  const [sales, setSales] = useState();

  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");
  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    Promise.all([getConcerts(), getSales()])
      .then((resp) => {
        setConcerts(resp[0]);
        setSales(resp[1]);
      })
      .catch((err) => {
        console.warn(err);
      });
  });

  const getSalesByConcertId = (concertId) => {
      if(!concertId || !sales){
          return 0;
      }
      const salesFilteredById = sales.filter((sale) =>  sale.concertId === concertId);
      return salesFilteredById.reduce((total, sale)=> total + sale?.quantity,0);
  }

  const filterConcerts = (concerts, query) => {
    if(!query){
      return concerts;
    }
    return concerts.filter((concert) => {
      const concertName = concert.name.toLowerCase();
      return concertName.includes(query);
    });
  };

  const filteredConcerts = filterConcerts(concerts, query);

  return (
    <div className="backoffice-sale-container">
      <div className="backoffice-sale-header">
          <h1>Ventas</h1>
          <button></button>
      </div>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} action="/backofficeSale" placeholder="Concierto"/>
      <div className="backoffice-sale-body">
          <table className="table table-bordered table-hover ">
              <tbody>
                  <tr>
                      <th>Concierto</th>
                      <th>Fecha</th>
                      <th>Total entradas</th>
                      <th>Total vendidas</th>
                  </tr>
                  {concerts && filteredConcerts.map((concert, index) => (
                      <tr key={index}>
                          <td>{concert.name}</td>
                          <td>{concert.date}</td>
                          <td>{concert.maxTickets}</td>
                          <td> {getSalesByConcertId(concert?._id)}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
      <hr/>
    </div>
  );
};

export default BackofficeSale;
