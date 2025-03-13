import React from 'react'

import { FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ShoppingListInputGroup = ({ editMode, onDelete, onMoveUp, onMoveDown, onPriceChange }) => {
  return (
    <>
    <div className="input-group mb-3">
        <div className={!editMode ? "input-group-text" : ""}>
          {!editMode &&(
            <input className="form-check-input fs-2" type="checkbox" value="" aria-label="Checkbox for following text input"/>
          )}
        </div>

        { editMode && (
              <div>   
            <button
            type="button"
            onClick={onMoveUp}
            title="Move up"
            className="btn btn-outline-primary"
            style={{marginRight: '10px'}}
          >
            <FaArrowUp/>
          </button>
          <button 
            type="button"
            onClick={onMoveDown}
            title="Move down"
            className="btn btn-outline-primary"
            style={{marginRight: '10px'}}
          >
            <FaArrowDown/>
          </button>
              </div>
            )}
        
            <input type="text" className="form-control" aria-label="Text input with checkbox"/>
           
            <span className="input-group-text">$</span>
            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" onChange={(e) => onPriceChange(e.target.value)} style={{maxWidth:"5rem"}}/>

            {editMode && (
        <div className="input-group-append">
          <button 
            className="btn btn-outline-danger" 
            type="button"
            onClick={onDelete}
            title="Delete item"
            style={{marginLeft: '10px'}}
          >
            <FaTrash/>
          </button>
          
        </div>
      )}


    </div> 
    </>
  )
};

export default ShoppingListInputGroup
