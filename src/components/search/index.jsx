import React from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import "./index.css";

const Search = ({ searchQuery, setSearchQuery, action, placeholder }) => {
  return (
    <div className="my-search">
      <form action={action} method="get">
        <label htmlFor="header-search"></label>
        <div className="my-input">
          <div className="my-input-content">
            <input
              value={searchQuery}
              onInput={(e) => setSearchQuery(e.target.value)}
              type="text"
              id="header-search"
              placeholder={placeholder}
              name="q"
            />
            <button type="submit"><CancelIcon style={{cursor:"pointer",width:"16px",color:"grey"}} onClick={()=>setSearchQuery('')}/></button>
          </div>
          <button type="submit">Buscar</button>
        </div>
      </form>
    </div>
  );
};

export default Search;
