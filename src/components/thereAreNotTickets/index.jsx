import React from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

const ThereAreNotTickets = () => {
    const history = useHistory();
    return (
        <div className="my-container">
            <h4>No tienes ningún evento a la vista</h4>
            <p>Las entradas que compres aparecerán automáticamente aquí. ¡Busca eventos y encuentra tus entradas!</p>
            <button onClick={() => history.push("/")}>Buscar eventos</button>
        </div>
    )
}

export default ThereAreNotTickets;