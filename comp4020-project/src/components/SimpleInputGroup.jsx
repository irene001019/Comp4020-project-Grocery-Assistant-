import React from "react";

const SimpleInputGroup = (props) => {
  return (
    <div className="row justify-content-center" style={props.style}>
      {props.items.map((valueName) => (
        <div className="col-6 mb-3 mb-sm-3">
          <div className="input-group">
            <span className="input-group-text">{valueName}</span>
            <input
              type="text"
              aria-label="Amount"
              className="form-control"
              style={{ maxWidth: "7rem" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleInputGroup;
