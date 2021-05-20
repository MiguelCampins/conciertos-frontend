import React, { useEffect, useState } from "react";
import { getConcerts, getSales } from "../../utils/api/apiConcert";
import "./index.css";

const BackofficeSale = () => {
  const [concerts, setConcerts] = useState();
  const [sales, setSales] = useState();

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

  return (
    <div className="backoffice-sale-container">
      <div className="backoffice-sale-header">
          <h1>Ventas</h1>
          <button></button>
      </div>
      <div className="backoffice-sale-body">
          <table className="table table-bordered table-hover ">
              <tbody>
                  <tr>
                      <th>Concierto</th>
                      <th>Fecha</th>
                      <th>Entradas</th>
                      <th>Ventas</th>
                  </tr>
                  {concerts && concerts.map((concert) => (
                      <tr>
                          <td>{concert.name}</td>
                          <td>{concert.date}</td>
                          <td>{concert.maxTickets}</td>
                          <td> {getSalesByConcertId(concert?._id)}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default BackofficeSale;
