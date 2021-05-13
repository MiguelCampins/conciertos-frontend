import React, { useState } from 'react';
import CreateConcertmodal from '../../components/createConcertModal';
import "./index.css";

const BackofficeConcerts = () =>{

    const [ showCreateConcertModal, setShowCreateConcertModal] = useState(false);

    return (
        <div className="concerts-container">
        <div className="concert-footer">
            <h1>Conciertos</h1>
            <button onClick={() => setShowCreateConcertModal(!showCreateConcertModal)}>Crear Concierto</button>
        </div>
       </div> 
    )
};

export default BackofficeConcerts;