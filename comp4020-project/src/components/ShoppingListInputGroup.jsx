import React from 'react'

const ShoppingListInputGroup = () => {
  return (
    <>
    <div className="input-group mb-3">
        <div className="input-group-text ">
            <input className="form-check-input fs-2" type="checkbox" value="" aria-label="Checkbox for following text input"/>
        </div>
            <input type="text" className="form-control" aria-label="Text input with checkbox"/>
            <span className="input-group-text">$</span>
            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" style={{maxWidth:"5rem"}}/>
    </div> 
    </>
  )
};

export default ShoppingListInputGroup
