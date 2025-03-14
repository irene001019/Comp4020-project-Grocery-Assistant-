import React, { useState } from 'react';
import { ListGroup, Form, Button, InputGroup } from 'react-bootstrap';
import { FaTrash, FaPen, FaCheck } from 'react-icons/fa';


function ShoppingList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', isEditing: false }
  ]);
  
  const [newItem, setNewItem] = useState('');
  
  // Add a new item to the list
  const addItem = () => {
    if (newItem.trim() !== '') {
      const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
      setItems([...items, { id: newId, name: newItem, isEditing: false }]);
      setNewItem('');
    }
  };
  
  // Delete an item from the list
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  // Toggle edit mode for an item
  const toggleEdit = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isEditing: !item.isEditing } : item
    ));
  };
  
  // Update item name
  const updateItemName = (id, newName) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, name: newName } : item
    ));
  };
  
  return (
    
    <div style={{width: 'calc(100% + 40px)', height: '100%',marginTop: '-22px',marginLeft: '-20px',  marginRight: '-20px',border:'none'}}>

    {/* Edit Items Header */}
    <div className="bg-primary text-white p-2 mb-3" style={{ borderRadius: '0px' }}>
          <strong>Edit Items</strong>
    </div>

     
      {/* Add new item input */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <Button  onClick={addItem}>
          Add
        </Button>
      </InputGroup>
      
      {/* List of items */}
      <ListGroup>
        {items.map(item => (
          <ListGroup.Item 
            key={item.id}
            className="d-flex"
            style={{ 
              borderTop: 'none', 
              borderLeft: 'none', 
              borderRight: 'none',
              borderBottom: '1px solid #007bff'
            }}
          >
            <div className="d-flex align-items-center" style={{ flex: 1}}>
              <span style={{ color: '#007bff', marginRight: '10px' }}>↑↓</span>
              
              {item.isEditing ? (
                <Form.Control
                  value={item.name}
                  onChange={(e) => updateItemName(item.id, e.target.value)}
                  autoFocus
                />
              ) : (
                <span>{item.name}</span>
              )}
            </div>
            
            <div>
              <Button 
                variant="link" 
                className="p-0 mx-2"
                onClick={() => toggleEdit(item.id)}
                style={{ color: '#007bff' }}
              >
                {item.isEditing ? <FaCheck /> : <FaPen />}
              </Button>
              <Button 
                variant="link" 
                className="p-0" 
                onClick={() => deleteItem(item.id)}
                style={{ color: '#dc3545' }}
              >
                <FaTrash />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  
   
  );
}

export default ShoppingList;