import React, { useState, forwardRef } from 'react'

const ButtonGroup = forwardRef((props, ref) => {
    const [internalSelectedItem, setInternalSelectedItem] = useState(-1);
    
    const selectedItem = props.selectedButton !== undefined ? props.selectedButton : internalSelectedItem;

    const handleClick = (index) => {
        if (selectedItem === index) {
          setInternalSelectedItem(-1);
        } else {
          setInternalSelectedItem(index);
        }
      
      if (props.onButtonClick) {
          props.onButtonClick(index, props.items[index]);
      }
  };


  return (
    <div className="container" style={{marginTop:'10px'}}>
        <div className="row justify-content-center" ref={ref}>
        {props.items.map((item, index)=>
        <div className="col-3 mb-sm-3" key={index}>
        <button type="button" className={selectedItem === index ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
            onClick={()=>{handleClick(index);}}>
            {item}
        </button>
        </div>
        )}
          </div>
        </div>
  )
});

export default ButtonGroup
