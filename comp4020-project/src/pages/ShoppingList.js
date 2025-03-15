import React from "react";
import ShoppingListInputGroup from "../components/ShoppingListInputGroup";
import ButtonGroup from "../components/ButtonGroup";
import SimpleInputGroup from "../components/SimpleInputGroup";
import { useState, useEffect } from "react";
import SearchComponent from "../components/SearchComponent";

const ShoppingList = () => {
  let simpleInputList = ["Total", "Budget", "Total-Budget"];
  let ButtonList = ["Upload", "Search", "Edit"];

  const [inputGroups, setInputGroups] = useState(() => {
    const savedInputGroups = localStorage.getItem('inputGroups');
    if (savedInputGroups) {
      return JSON.parse(savedInputGroups);
    } else {
      return ['item1', 'item2', 'item3', 'item4'];
    }
  });

  const [prices, setPrices] = useState(() => {
    const savedPrices = localStorage.getItem('prices');
    if (savedPrices) {
      return JSON.parse(savedPrices);
    } else {
      // Default prices
      return {
        item1: '1.99',
        item2: '3.49',
        item3: '2.99',
        item4: '7.50'
      };
    }
  });
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('budget');
    return savedBudget || '20.00';
  });

  const [calculatedValues, setCalculatedValues] = useState(["0.00", "", ""]);

  const [itemNames, setItemNames] = useState(() => {
    const savedItemNames = localStorage.getItem('itemNames');
    if (savedItemNames) {
      return JSON.parse(savedItemNames);
    } else {
      return {
        item1: 'Apple',
        item2: 'Milk',
        item3: 'Juice',
        item4: 'Fish'
      };
    }
  });

  // Add state for search popup visibility
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const [editMode, setEditMode] = useState(false);
  
  // State for modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToAdd, setItemToAdd] = useState({});
  
  // State for grocery items
  const [groceryItems, setGroceryItems] = useState(() => {
    const savedGroceryItems = localStorage.getItem('groceryItems');
    return savedGroceryItems ? JSON.parse(savedGroceryItems) : [];
  });
  
  // State for tracking checked items
  const [checkedItems, setCheckedItems] = useState({});
  
  // Queue of items to process
  const [itemQueue, setItemQueue] = useState([]);
  
  // State for alert message
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  // State for budget alert
  const [showBudgetAlert, setShowBudgetAlert] = useState(false);
  const [budgetOverAmount, setBudgetOverAmount] = useState('0.00');
  
  // Form validation
  const [formErrors, setFormErrors] = useState({});

  // Save shopping list data to localStorage whenever it changes
  useEffect(() => {
    // Save input groups
    localStorage.setItem('inputGroups', JSON.stringify(inputGroups));
    
    // Save prices
    localStorage.setItem('prices', JSON.stringify(prices));
    
    // Save budget
    localStorage.setItem('budget', budget);
    
    // Save item names
    localStorage.setItem('itemNames', JSON.stringify(itemNames));
    
    // Save checked items
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    
    // Save all shopping list data in one object
    const shoppingListData = {
      inputGroups,
      prices,
      budget,
      itemNames,
      checkedItems
    };
    localStorage.setItem('shoppingListItems', JSON.stringify(shoppingListData));
  }, [inputGroups, prices, budget, itemNames, checkedItems]);

  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
  }, [groceryItems]);

  useEffect(() => {
    const loadShoppingList = () => {
      try {
        const savedShoppingList = localStorage.getItem('shoppingListItems');
        if (savedShoppingList) {
          const parsedData = JSON.parse(savedShoppingList);
          
          if (parsedData.inputGroups && parsedData.inputGroups.length > 0) {
            setInputGroups(parsedData.inputGroups);
          } else {
            setInputGroups(['item1', 'item2', 'item3', 'item4']);
          }
          
          if (parsedData.itemNames) {
            setItemNames(parsedData.itemNames);
          }
          
          if (parsedData.prices) {
            setPrices(parsedData.prices);
          }
          
          if (parsedData.budget) {
            setBudget(parsedData.budget);
          }
          
          if (parsedData.checkedItems) {
            setCheckedItems(parsedData.checkedItems);
          }
        } else {
          setInputGroups(['item1', 'item2', 'item3', 'item4']);
        }
      } catch (error) {
        console.error('Error loading shopping list from local storage:', error);
        setInputGroups(['item1', 'item2', 'item3', 'item4']);
      }
    };
    
    loadShoppingList();
  }, []);

  useEffect(() => {
    const saveShoppingList = () => {
      try {
        const shoppingListData = {
          inputGroups,
          itemNames,
          prices,
          budget,
          checkedItems
        };
        
        localStorage.setItem('shoppingListItems', JSON.stringify(shoppingListData));
      } catch (error) {
        console.error('Error saving shopping list to local storage:', error);
      }
    };
    
    if (inputGroups.length > 0) {
      saveShoppingList();
    }
  }, [inputGroups, itemNames, prices, budget, checkedItems]);
  
  // Process the next item in the queue when modal is closed
  useEffect(() => {
    if (!showModal && itemQueue.length > 0) {
      processNextItem();
    }
  }, [showModal, itemQueue]);
  
  // Hide alert after 3 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  
  // Reset form errors when modal is opened
  useEffect(() => {
    if (showModal) {
      setFormErrors({});
    }
  }, [showModal]);

  // Function to add a new input group
  const addInputGroup = () => {
    // Check if there are any empty name fields
    const hasEmptyName = inputGroups.some(id => !itemNames[id] || itemNames[id].trim() === '');
    
    // If there's an empty name field, show an alert and don't add a new input group
    if (hasEmptyName) {
      setAlertMessage('Please fill in the item name before adding a new item.');
      setShowAlert(true);
      // Auto-hide the alert after 3 seconds
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    
    // Check if budget is negative
    if (calculatedValues[2] && parseFloat(calculatedValues[2]) < 0) {
      setBudgetOverAmount(Math.abs(parseFloat(calculatedValues[2])).toFixed(2));
      setShowBudgetAlert(true);
    }
    
    const newId = Date.now().toString();
    setInputGroups(prev => [...prev, newId]);
    setItemNames(prev => ({ ...prev, [newId]: '' }));
    setPrices(prev => ({ ...prev, [newId]: '' }));
    setCheckedItems(prev => ({ ...prev, [newId]: false }));
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
    } else if (buttonName === "Edit") {
      setEditMode(!editMode); 
      setShowSearchPopup(false);
    } else if (buttonName === "Upload") {
      setEditMode(false);
      setShowSearchPopup(false);
      processCheckedItems();
    }
  };
  
  // Process all checked items
  const processCheckedItems = () => {
    // Get all checked items
    const itemsToProcess = [];
    
    for (const id of inputGroups) {
      if (checkedItems[id]) {
        const name = itemNames[id] || '';
        const price = prices[id] || '';
        
        if (name.trim()) {
          itemsToProcess.push({
            id,
            name,
            price
          });
        }
      }
    }
    
    if (itemsToProcess.length > 0) {
      // Set the queue and start processing
      setItemQueue(itemsToProcess);
      processNextItem();
    } else {
      // Show alert message if no items are selected or the list is empty
      if (inputGroups.length === 0) {
        setAlertMessage('No items on the list');
      } else {
        setAlertMessage('No items selected');
      }
      setShowAlert(true);
    }
  };
  
  // Process the next item in the queue
  const processNextItem = () => {
    if (itemQueue.length === 0) return;
    
    const nextItem = itemQueue[0];
    setSelectedItem(nextItem);
    
    // Initialize the item to add with default values
    setItemToAdd({
      name: nextItem.name,
      price: nextItem.price, // Price will be used as the amount
      category: '', // Empty by default to force selection
      storageType: '', // Empty by default to force selection
      purchaseDate: new Date().toISOString().split('T')[0], // Today's date
      expireDate: '', // Empty by default
      calories: '', // Empty by default to force input
      checked: true
    });
    
    setShowModal(true);
  };

  // Function to handle item deletion and reordering
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
    setCheckedItems(prev => {
      const newChecked = {...prev};
      delete newChecked[id];
      return newChecked;
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
  
  // Handle checkbox toggle
  const handleCheckboxToggle = (id, isChecked) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: isChecked
    }));
  };
  
  // Close the modal and process next item
  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    
    // Remove the processed item from the queue
    setItemQueue(prev => prev.slice(1));
  };
  
  // Handle changes to the item in the modal
  const handleItemChange = (field, value) => {
    setItemToAdd(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear the error for this field when user makes a change
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Validate form fields
  const validateForm = () => {
    // Define the required fields in the order they should be validated
    const requiredFields = [
      { field: 'name', label: 'Item Name' },
      { field: 'price', label: 'Price' },
      { field: 'category', label: 'Category' },
      { field: 'storageType', label: 'Storage Type' },
      { field: 'purchaseDate', label: 'Purchase Date' },
      { field: 'expireDate', label: 'Expiration Date' },
      { field: 'calories', label: 'Calories' }
    ];
    
    // Clear all previous errors
    const errors = {};
    
    // Check fields one by one and return on the first error
    for (const { field, label } of requiredFields) {
      if (!itemToAdd[field] || itemToAdd[field].toString().trim() === '') {
        // Only set error for this specific field
        errors[field] = `${label} is required`;
        setFormErrors(errors);
        // Set alert message to indicate which field needs attention
        setAlertMessage(`Please fill in the ${label} field`);
        setShowAlert(true);
        return false;
      }
    }
    
    // If we get here, all fields are valid
    setFormErrors({});
    return true;
  };
  
  // Add item to grocery items
  const addToGroceryItems = () => {
    // Validate form first
    if (!validateForm()) {
      // Alert is already set in validateForm
      return;
    }
    
    // Generate a unique ID for the grocery item
    const newId = groceryItems.length > 0 
      ? Math.max(...groceryItems.map(item => item.id)) + 1 
      : 1;
    
    const newItem = {
      ...itemToAdd,
      id: newId
    };
    
    setGroceryItems([...groceryItems, newItem]);
    
    // Also add the item to storageItems in local storage
    const storageItems = JSON.parse(localStorage.getItem('storageItems') || '[]');
    const storageItemId = storageItems.length > 0
      ? Math.max(...storageItems.map(item => item.id)) + 1
      : 1;
    
    const storageItem = {
      ...newItem,
      id: storageItemId,
      amount: newItem.price // Use price as amount for storage item
    };
    
    const updatedStorageItems = [...storageItems, storageItem];
    localStorage.setItem('storageItems', JSON.stringify(updatedStorageItems));
    
    // Remove the item from the shopping list
    if (selectedItem) {
      deleteInputGroup(selectedItem.id);
    }
    
    closeModal();
  };

  return (
    <div className="container text-center" >
      
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
  
  {/* Alert message */}
  {showAlert && (
    <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
      {alertMessage}
      <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
    </div>
  )}
  
  {/* Budget Alert */}
  {showBudgetAlert && (
    <>
      {/* Overlay to prevent interaction with the rest of the app */}
      <div className="position-fixed top-0 start-0 w-100 h-100" 
           style={{ 
             backgroundColor: 'rgba(0,0,0,0.5)', 
             zIndex: 15000 
           }} />
      
      {/* Alert dialog */}
      <div className="position-fixed top-50 start-50 translate-middle" 
           style={{ 
             zIndex: 15001, 
             width: '350px',
             boxShadow: '0 0 20px rgba(255,0,0,0.5)',
             animation: 'pulse 1.5s infinite'
           }}>
        <div className="alert alert-danger text-center border border-danger border-3" role="alert">
          <h4 className="alert-heading fw-bold">Budget Exceeded!</h4>
          <p className="fs-5">Your shopping total is over budget.</p>
          <p className="text-danger fw-bold fs-5">
            ${budgetOverAmount} over budget
          </p>
          <hr />
          <button 
            className="btn btn-danger btn-lg fw-bold" 
            onClick={() => setShowBudgetAlert(false)}
          >
            Continue Shopping
          </button>
        </div>
      </div>
      
      {/* Add CSS for animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  )}

      {/* Shopping list items in a card with black border */}
      <div className="card border-dark mb-3">
        <div className="card-header bg-dark text-white">
          <div className="row align-items-center">
            <div className="col-1"></div> {/* Checkbox column */}
            <div className="col">Item Name</div>
            <div className="col-2 text-end">Price</div>
          </div>
        </div>
        
      
        
        <div className="card-body p-2">
          {/* Scrollable list container */}
          <div className="flex-grow-1 overflow-auto" style={{ maxHeight: '30vh', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {inputGroups
              // Filter out empty items in edit mode
              .filter(id => !editMode || (itemNames[id] && itemNames[id].trim() !== ''))
              .length > 0 ? (
                inputGroups
                  // Filter out empty items in edit mode
                  .filter(id => !editMode || (itemNames[id] && itemNames[id].trim() !== ''))
                  .map((id) => (
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
                      initialName={itemNames[id] || ''}
                      initialPrice={prices[id] || ''}
                      isChecked={checkedItems[id] || false}
                      onCheckboxChange={(isChecked) => handleCheckboxToggle(id, isChecked)}
                    />
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted mb-0">No items in your shopping list</p>
                </div>
              )}
          </div>
        </div>
        <div className="card-footer">
          <div className="text-center">
            {!editMode && (
              <button
                className="btn btn-primary"
                onClick={addInputGroup}
              >
                + Add new Item 
              </button>
            )}
          </div>
        </div>
      </div>
     

      {/* Modal for adding item to grocery items */}
      {showModal && selectedItem && (
        <div style={{
          display: 'block',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1300,
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            maxWidth: '90%',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          }}>
            <div className="p-3">
              {/* Header with title and close button */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="m-0">Add to Grocery Items</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              
              <div className="mb-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="itemName" className="form-label">Item Name</label>
                    <input 
                      type="text" 
                      className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                      id="itemName" 
                      value={itemToAdd.name} 
                      onChange={(e) => handleItemChange('name', e.target.value)}
                      placeholder="Enter item name"
                    />
                    {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="itemPrice" className="form-label">Price/Amount</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">$</span>
                      <input 
                        type="text" 
                        className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
                        id="itemPrice" 
                        value={itemToAdd.price} 
                        onChange={(e) => handleItemChange('price', e.target.value)}
                        placeholder="0.00"
                      />
                      {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="itemCategory" className="form-label">Category</label>
                    <select 
                      className={`form-select ${formErrors.category ? 'is-invalid' : ''}`}
                      id="itemCategory"
                      value={itemToAdd.category}
                      onChange={(e) => handleItemChange('category', e.target.value)}
                    >
                      <option value="">Select a category</option>
                      <option value="Fruit">Fruit</option>
                      <option value="Vegetable">Vegetable</option>
                      <option value="Meat">Meat</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Baking">Baking</option>
                      <option value="Frozen">Frozen</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.category && <div className="invalid-feedback">{formErrors.category}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="itemStorage" className="form-label">Storage Type</label>
                    <select 
                      className={`form-select ${formErrors.storageType ? 'is-invalid' : ''}`}
                      id="itemStorage"
                      value={itemToAdd.storageType}
                      onChange={(e) => handleItemChange('storageType', e.target.value)}
                    >
                      <option value="">Select a storage type</option>
                      <option value="Fridge">Fridge</option>
                      <option value="Freezer">Freezer</option>
                      <option value="Pantry">Pantry</option>
                    </select>
                    {formErrors.storageType && <div className="invalid-feedback">{formErrors.storageType}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
                    <input 
                      type="date" 
                      className={`form-control ${formErrors.purchaseDate ? 'is-invalid' : ''}`}
                      id="purchaseDate" 
                      value={itemToAdd.purchaseDate}
                      onChange={(e) => handleItemChange('purchaseDate', e.target.value)}
                    />
                    {formErrors.purchaseDate && <div className="invalid-feedback">{formErrors.purchaseDate}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="expireDate" className="form-label">Expiration Date</label>
                    <input 
                      type="date" 
                      className={`form-control ${formErrors.expireDate ? 'is-invalid' : ''}`}
                      id="expireDate" 
                      value={itemToAdd.expireDate}
                      onChange={(e) => handleItemChange('expireDate', e.target.value)}
                    />
                    {formErrors.expireDate && <div className="invalid-feedback">{formErrors.expireDate}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="itemCalories" className="form-label">Calories</label>
                    <input 
                      type="number" 
                      className={`form-control ${formErrors.calories ? 'is-invalid' : ''}`}
                      id="itemCalories" 
                      value={itemToAdd.calories}
                      onChange={(e) => handleItemChange('calories', e.target.value)}
                      placeholder="Enter calories"
                    />
                    {formErrors.calories && <div className="invalid-feedback">{formErrors.calories}</div>}
                  </div>
                </form>
              </div>
              
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={closeModal}>Skip</button>
                <button type="button" className="btn btn-primary" onClick={addToGroceryItems}>Add to Grocery</button>
              </div>
            </div>
            
          </div>
       
        </div>
        
      )}

      {/* total and budget */}
      <h5 className="mt-3 mb-2">Summary</h5>
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
