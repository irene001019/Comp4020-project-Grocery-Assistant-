import React from 'react'
import { useState } from 'react';

const ButtonGroup = (props) => {
    const [selectedItem, setSelectedItem] = useState(-1);

    const handleClick = (index) => {
      setSelectedItem(index);
      
      if (props.onButtonClick) {
          props.onButtonClick(index, props.items[index]);
      }
  };


  return (
    <div className="container" style={{marginTop:'10px'}}>
        <div className="row justify-content-center">
        {props.items.map((item, index)=>
        <div className="col-3 mb-sm-3">
        <button type="button" className={selectedItem === index ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
            onClick={()=>{handleClick(index);}}>
            {item}
        </button>
        </div>
        )}
          </div>
        </div>
  )
};

export default ButtonGroup
