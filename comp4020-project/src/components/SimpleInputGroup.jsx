import React from "react";

const SimpleInputGroup = (props) => {
  return (
    <div className="row justify-content-center" style={props.style}>
      {props.items.map((valueName, index) => (
        <div className="row-3 mb-1" key={index}>
          <div className="input-group">
            <span className="input-group-text">{valueName}</span>
            <input
              type="text"
              aria-label="Amount"
              className={`form-control ${valueName === 'Total-Budget' && props.values && parseFloat(props.values[index]) < 0 ? 'text-danger fw-bold' : ''}`}
              value={props.values ? props.values[index] : ""}
              onChange={(e) => {
                if (props.onValueChange && valueName === "Budget") {
                  props.onValueChange(index, e.target.value);
                }
              }}
              readOnly={valueName === "Total" || valueName === "Total-Budget"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleInputGroup;
