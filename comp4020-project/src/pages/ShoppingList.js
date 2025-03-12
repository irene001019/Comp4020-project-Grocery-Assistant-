import React from "react";
import ShoppingListInputGroup from "../components/ShoppingListInputGroup";
import ButtonGroup from "../components/ButtonGroup";
import SimpleInputGroup from "../components/SimpleInputGroup";
import { useState } from "react";

const ShoppingList = () => {
  let simpleInputList = ["Total", "Budget", "Total-Budget"];
  let ButtonList = ["Upload", "Search", "Edit"];

  // Initial input group
  const [inputGroups, setInputGroups] = useState([1]);

  // Function to add more input groups
  const addInputGroup = () => {
    setInputGroups([...inputGroups, inputGroups.length + 1]);
  };

  return (
    <div className="container text-center">
      
        <h1>Shopping List</h1>
        <ButtonGroup items={ButtonList} />
        
      {/* increace input space scroll-able*/}
      <div className="flex-grow-1 overflow-auto mt-3 " style={{ maxHeight: '40vh' }}>
        {inputGroups.map((id) => (
          <ShoppingListInputGroup key={id} />
        ))}
      </div>
      {/* button for add more input space */}
      <button className="btn btn-primary btn-lg " onClick={addInputGroup} style={{marginTop:'10px',marginBottom:'10px'}}>
        + 
      </button>
      {/* total and budget */}
      <SimpleInputGroup
        items={simpleInputList}
        
      />
    </div>
  );
};

export default ShoppingList;
