import React, { useState } from 'react';
import { Form, InputGroup, Button, Card, ListGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function StorageSearchComponent({ items, onItemClick }) {
  const [searchTerm, setSearchTerm] = useState('');
   
  const allItems = items.map(item => item);
  
  const filteredItems = allItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getExpirationText = (expireDate) => {
    const currentDate = new Date();
    const expiryDate = new Date(expireDate);
    
    const timeDiff = expiryDate - currentDate;
   
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) {
      return `Expired ${Math.abs(daysDiff)} days ago`;
    } else if (daysDiff === 0) {
      return 'Expires today';
    } else if (daysDiff === 1) {
      return 'Expires tomorrow';
    } else {
      return `Will expire in ${daysDiff} days`;
    }
  };

  // Function to get expiration color
  const getExpirationColor = (daysDiff) => {
    if (daysDiff < 0) {
      return '#dc3545'; 
    } else if (daysDiff <= 3) {
      return '#ffc107'; 
    } else if (daysDiff <= 7) {
      return '#0d6efd'; 
    } else {
      return '#198754'; 
    }
  };

  return (
    <Card style={{ width: 'calc(100% + 40px)', height: '100%', marginTop: '-22px', marginLeft: '-20px', marginRight: '-20px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'black'}}>
      <Card.Body>
        <InputGroup className="mb-3">   
          <Form.Control
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-primary">
            <FaSearch />
          </Button>
        </InputGroup>
        
        <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
          <ListGroup variant="flush">
            {filteredItems.map((item) => {
              const currentDate = new Date();
              const expiryDate = new Date(item.expireDate);
              const timeDiff = expiryDate - currentDate;
              const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
              const expirationColor = getExpirationColor(daysDiff);

              return (
                <ListGroup.Item 
                  key={item.id} 
                  className="py-2 border-bottom"
                  onClick={() => onItemClick({ ...item })}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease-in-out' 
                  }}
                 
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {item.element && item.element[0]}
                    <span style={{ marginLeft: '10px' }}>{item.name}</span>
                  </div>
                  <div style={{ fontSize: '0.8em', color: expirationColor }}>
                    {getExpirationText(item.expireDate)}
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StorageSearchComponent;
