import React from "react";
import ShoppingListInputGroup from "../components/ShoppingListInputGroup";
import ButtonGroup from "../components/ButtonGroup";
import SimpleInputGroup from "../components/SimpleInputGroup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";

const ShoppingList = () => {
  let simpleInputList = ["Total", "Budget", "Total-Budget"];
  let ButtonList = ["Upload", "Search", "Edit"];

  // Initial input group
  const [inputGroups, setInputGroups] = useState([1]);

  // Track prices and budget
  const [prices, setPrices] = useState({});
  const [budget, setBudget] = useState("");

  // Values to display in SimpleInputGroup
  const [calculatedValues, setCalculatedValues] = useState(["0.00", "", ""]);

  const [itemNames, setItemNames] = useState({});

  const navigate = useNavigate();

   // Add state for search popup visibility
   const [showSearchPopup, setShowSearchPopup] = useState(false);

   const [editMode, setEditMode] = useState(false);

  // Function to add more input groups
  const addInputGroup = () => {
    const newId = inputGroups.length + 1;
    setInputGroups([...inputGroups, newId]);
    setItemNames(prev => ({ ...prev, [newId]: '' }));
  };

  // Calculate totals whenever prices or budget changes
  useEffect(() => {
    const total = Object.values(prices).reduce(
      (sum, price) => sum + (parseFloat(price) || 0),
      0
    );
    const totalFormatted = total.toFixed(2);
    const diff = budget ? (parseFloat(budget) - total).toFixed(2) : "";
    setCalculatedValues([totalFormatted, budget, diff]);
  }, [prices, budget]);

    // Handle button clicks
  const handleButtonClick = (index, buttonName) => {
    if (buttonName === "Search") {
      setShowSearchPopup(!showSearchPopup);
      setEditMode(false); 
    }else if (buttonName === "Edit") {
      setEditMode(!editMode); 
      setShowSearchPopup(false);
    }else if (buttonName === "Upload") {
      setEditMode(false);
      setShowSearchPopup(false);
    }
  };


//function to handle item deletion and reordering
const deleteInputGroup = (id) => {
  setInputGroups(prevGroups => prevGroups.filter(groupId => groupId !== id));
  setPrices(prevPrices => {
    const newPrices = {...prevPrices};
    delete newPrices[id];
    return newPrices;
  });
  setItemNames(prev => {
    const newNames = {...prev};
    delete newNames[id];
    return newNames;
  });
};

const moveInputGroup = (id, direction) => {
  const currentIndex = inputGroups.indexOf(id);
  const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  
  if (newIndex >= 0 && newIndex < inputGroups.length) {
    const newInputGroups = [...inputGroups];
    [newInputGroups[currentIndex], newInputGroups[newIndex]] = 
    [newInputGroups[newIndex], newInputGroups[currentIndex]];
    setInputGroups(newInputGroups);
  }
};

// Handle item name changes
const handleItemNameChange = (id, name) => {
  setItemNames(prev => ({
    ...prev,
    [id]: name
  }));
};



  return (
    <div className="container text-center">
      
        <h1>Shopping List</h1>
      

 
  <div >
  <ButtonGroup items={ButtonList} onButtonClick={handleButtonClick} />

    
    {showSearchPopup && (
      <div style={{ 
        position: 'absolute',
        
        zIndex: 1000,
        marginTop: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
       
      }}>
        <SearchComponent  items={inputGroups.map(id => ({
        id,
        name: itemNames[id] || '',
        price: prices[id] || ''
      }))} />
      </div>
    )}
  </div>
        
      {/* increace input space scroll-able*/}
      <div className="flex-grow-1 overflow-auto mt-3 " style={{ maxHeight: '40vh' }}>
          {inputGroups.map((id) => (
      <ShoppingListInputGroup 
        key={id}
        id={id}
        editMode={editMode}
        onDelete={() => deleteInputGroup(id)}
        onMoveUp={() => moveInputGroup(id, 'up')}
        onMoveDown={() => moveInputGroup(id, 'down')}
        onPriceChange={(price) => {
          setPrices(prev => ({ ...prev, [id]: price }));
        }}  
        onNameChange={(name) => handleItemNameChange(id, name)}
      />
    ))}
      </div>
      {/* button for add more input space */}
      <button
        className="btn btn-primary btn-lg "
        onClick={addInputGroup}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        +
      </button>
      {/* total and budget */}
      <SimpleInputGroup
        items={simpleInputList}
        values={calculatedValues}
        onValueChange={(index, value) => {
          if (index === 1) setBudget(value);
        }}/>

     
     
        

    </div>
  );
};

export default ShoppingList;
