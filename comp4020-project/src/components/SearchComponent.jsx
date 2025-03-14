import React, { useState } from 'react';
import { Form, InputGroup, Button, Card, ListGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function SearchComponent({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
   
  
  const allItems = [
    'Apple', 'Milk', 'Juice', 'Fish', 
    ...items.map(item => item.name).filter(name => name) 
  ];
  
  const uniqueItems = [...new Set(allItems)];
  
  const filteredItems = uniqueItems.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card style={{ width: 'calc(100% + 40px)', height: '100%',marginTop: '-22px',marginLeft: '-20px',  marginRight: '-20px', borderStyle: 'solid ', borderWidth: '3px',borderColor: 'black'}}>
      
      
      <Card.Body >
        <InputGroup className="mb-3">   
          <Form.Control
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-primary" >
            <FaSearch />
          </Button>
        </InputGroup>
        
        <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
        <ListGroup variant="flush">
          {filteredItems.map((item, index) => (
            <ListGroup.Item key={index} className="py-2 border-bottom">
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SearchComponent;