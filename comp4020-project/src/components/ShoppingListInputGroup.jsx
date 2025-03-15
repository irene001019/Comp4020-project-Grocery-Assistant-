import React, { useState, useEffect } from 'react';
import { FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ShoppingListInputGroup = ({ id, editMode, onDelete, onMoveUp, onMoveDown, onPriceChange, onNameChange, initialName = '', initialPrice = '', isChecked = false, onCheckboxChange }) => {
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);
  
  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    onNameChange(newName);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    onPriceChange(newPrice);
  };
  
  const handleCheckboxChange = (e) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    if (onCheckboxChange) {
      onCheckboxChange(newChecked);
    }
  };

  return (
    <>
    <div className="input-group mb-3">
        {/* Checkbox or Edit buttons based on mode */}
        {!editMode ? (
          <div className="input-group-text">
            <input 
              className="form-check-input fs-2" 
              type="checkbox" 
              checked={checked}
              onChange={handleCheckboxChange}
              aria-label="Checkbox for following text input"
            />
          </div>
        ) : (
          <div className="input-group-prepend d-flex">
            <button
              type="button"
              onClick={onMoveUp}
              title="Move up"
              className="btn btn-outline-primary"
              style={{marginRight: '5px'}}
            >
              <FaArrowUp/>
            </button>
            <button 
              type="button"
              onClick={onMoveDown}
              title="Move down"
              className="btn btn-outline-primary"
              style={{marginRight: '5px'}}
            >
              <FaArrowDown/>
            </button>
          </div>
        )}
        
        {/* Item Name Input */}
        <input 
          type="text" 
          className="form-control" 
          aria-label="Text input with checkbox" 
          value={name}
          onChange={handleNameChange}
          placeholder="Enter item name"
        />
       
        {/* Price Input */}
        <span className="input-group-text">$</span>
        <input 
          type="text" 
          className="form-control" 
          aria-label="Dollar amount (with dot and two decimal places)" 
          value={price}
          onChange={handlePriceChange} 
          style={{maxWidth:"5rem"}}
          placeholder="0.00"
        />

        {/* Delete button in edit mode */}
        {editMode && (
          <button 
            className="btn btn-outline-danger" 
            type="button"
            onClick={onDelete}
            title="Delete item"
            style={{marginLeft: '5px'}}
          >
            <FaTrash/>
          </button>
        )}
    </div> 
    </>
  )
};

export default ShoppingListInputGroup;
