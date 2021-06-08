import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./index.css";

const MultiInput = ({ onChange, error, value }) => {
  const [values, setValues] = useState([]);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(()=> {
    if(value?.length && 'string' === typeof value) {
      const vals = value.split(",");
      setValues(vals);
    }
  } ,[ value ])

  const onChangeValues = (vals) => {
    if(onChange) {
      onChange(vals);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentValue !== "") {
      const newValues = [...values, currentValue];
      setValues(newValues);
      onChangeValues(newValues);
      setCurrentValue("");
    }
  };

  const deleteValue = (index) => {
    const newValues = values.filter((item, idx) => idx !== index);
    setValues(newValues);
    onChangeValues(newValues);
    setValues(newValues);
  };

  return (
    <>
      <span>Pulsa enter para añadir artista</span>
      <div className="input-container">
        <div style={error && {border:"2px solid red"}} className="input-tag-container">
          <input
            placeholder="Artistas"
            onKeyDown={handleKeyDown}
            onChange={(e) => setCurrentValue(e.target.value)}
            value={currentValue}
          />
          {values?.length ?
            values.map((art, index) => (
              <div key={index} className="input-tag">
                <span>{art}</span>
                <CloseIcon onClick={() => deleteValue(index)} />
              </div>
            )) : null}
        </div>
      </div>
    </>
  );
};

export default MultiInput;
