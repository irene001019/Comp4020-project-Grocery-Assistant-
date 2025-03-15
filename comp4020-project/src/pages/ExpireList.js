import React, { useState, useRef, useEffect } from 'react';
import ButtonGroup from '../components/ButtonGroup';
import StorageSearchComponent from '../components/StorageSearchComponent';
import { FaCircle } from "react-icons/fa";
import { GiFishbone } from "react-icons/gi";
import { IoInformationCircle } from "react-icons/io5";
import {
  Checkbox,  Typography, Popover,
  FormControlLabel, Paper,  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { Delete} from '@mui/icons-material';

const ExpireList = () => {
  const [selectedButton, setSelectedButton] = useState(-1); 
   const [deleteAction, setDeleteAction] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null); 
    const [editedItem, setEditedItem] = useState({}); 
  
    const [filterAnchorEl, setFilterAnchorEl] = useState(null); 
    const [filterCategory, setFilterCategory] = useState([]); 
    const [filterStorageType, setFilterStorageType] = useState([]); 
    const [sortDirection, setSortDirection] = useState('asc');
  
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [showSearchPopup, setShowSearchPopup] = useState(false);  
    
    const [infoAnchorEl, setInfoAnchorEl] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
   
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('storageItems');
    console.log('ExpireList - savedItems:', savedItems);
    const defaultItems = [
      { id: 1, name: 'Banana', checked: true, category: 'Fruit', storageType: 'Fridge', purchaseDate: '2025-03-10', expireDate: '2025-03-20', price: '$3', amount: '3' },
      { id: 2, name: 'Yogurt', checked: true, category: 'Dairy', storageType: 'Fridge', purchaseDate: '2025-03-12', expireDate: '2025-03-19', price: '$4', amount: '1' },
      { id: 3, name: 'Pepsi', checked: true, category: 'Beverage', storageType: 'Fridge', purchaseDate: '2025-03-05', expireDate: '2025-03-25', price: '$2', amount: '1' },
      { id: 4, name: 'Fish', checked: true, category: 'Meat', storageType: 'Freezer', purchaseDate: '2025-03-08', expireDate: '2025-04-08', price: '$8', amount: '2' },
    ];
    const result = savedItems ? JSON.parse(savedItems) : defaultItems;
    console.log('ExpireList - using items:', result);
    return result;
  });

  useEffect(() => {
    localStorage.setItem('storageItems', JSON.stringify(items));
  }, [items]);

  const [wasteItems, setWasteItems] = useState(() => {
    const savedWasteItems = localStorage.getItem('wasteItems');
    return savedWasteItems ? JSON.parse(savedWasteItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('wasteItems', JSON.stringify(wasteItems));
  }, [wasteItems]);

 

  const getExpirationClass = (expireDate) => {
    const currentDate = new Date();
    const expiryDate = new Date(expireDate);
    
    const timeDiff = expiryDate - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) {
      return 'text-danger';
    } else if (daysDiff <= 3) {
      return 'text-warning';
    } else if (daysDiff <= 7) {
      return 'text-primary'; 
    } else {
      return 'text-success'; 
    }
  };

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

  const filteredItems = items.filter(item => {
    const categoryCondition = filterCategory.length === 0 || filterCategory.includes(item.category);
    const storageCondition = filterStorageType.length === 0 || filterStorageType.includes(item.storageType);
    
    return categoryCondition && storageCondition;
  }).sort((a, b) => {
    const currentDate = new Date();
    const expireDateA = new Date(a.expireDate);
    const expireDateB = new Date(b.expireDate);
    
    const daysUntilExpirationA = Math.ceil((expireDateA - currentDate) / (1000 * 60 * 60 * 24));
    const daysUntilExpirationB = Math.ceil((expireDateB - currentDate) / (1000 * 60 * 60 * 24));
    
    return sortDirection === 'asc' 
      ? daysUntilExpirationA - daysUntilExpirationB 
      : daysUntilExpirationB - daysUntilExpirationA;
  });
  const itemList = filteredItems.map(item => [
    <FaCircle className={getExpirationClass(item.expireDate)} />, 
    item.name,
    item
  ]);

  let ButtonList =[
    "Filter",
    "Search",
    "Sort"
  ];

  const allCategories = ["Fruit", "Vegetable", "Meat", "Dairy", "Beverage", "Baking", "Frozen"];
  const allStorageTypes = ["Fridge", "Freezer", "Pantry"];

    const buttonContainerRef = useRef(null);

  const handleButtonClick = (index, buttonName) => {    
    if (buttonName === 'Filter') {
      const filterButton = buttonContainerRef.current.querySelector(`.col-3:nth-child(${index + 1}) button`);
      setFilterAnchorEl(filterButton);
      setSelectedButton(index); 
      setShowSearchPopup(false);
    } else if (buttonName === 'Search') {
      setShowSearchPopup(!showSearchPopup);
      setFilterAnchorEl(null);
      setSelectedButton(showSearchPopup ? -1 : index);
    } else if (buttonName === 'Sort') {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
      setSelectedButton(index);
    }
  };
  const handleSearchItemClick = (item) => {
    setSelectedItem(item);
    setShowSearchPopup(false);
    setEditedItem({...item});
  };

  const handleDeleteConfirm = (action) => {
    setDeleteAction(action);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteAction === 'checked') {
      setItems(items.filter(item => !item.checked));
    } else if (deleteAction === 'single' && selectedItem) {
      const itemToDelete = selectedItem[2];
      setItems(items.filter(i => i.id !== itemToDelete.id));
    } else if (deleteAction === 'waste' && selectedItem) {
      const itemToWaste = selectedItem[2];
      setWasteItems([...wasteItems, itemToWaste]);
      setItems(items.filter(i => i.id !== itemToWaste.id));
    } else if (deleteAction === 'save') {
      setItems(items.map(item => 
        item.id === editedItem.id ? editedItem : item
      ));
      setSelectedItem(editedItem);
    }
    setConfirmDialogOpen(false);
  };

  const deleteItem = (item) => {
    setSelectedItem(item);
    handleDeleteConfirm('single');
  };

  const moveToWaste = (item) => {
    setSelectedItem(item);
    handleDeleteConfirm('waste');
  };
 
  const toggleFilter = (type, value) => {
    if (type === 'category') {
      setFilterCategory(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (type === 'storageType') {
      setFilterStorageType(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    }
  };

  const handleInfoClick = (event) => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setInfoAnchorEl(null);
  };

  return (
    <div>
    <div className='container text-center'>
       <h1 style={{ display: 'inline-flex', alignItems: 'center' }}>
         Expire List
         <div 
           className="info-icon-container"
           style={{
             marginLeft: '10px',
             cursor: 'pointer',
             backgroundColor: isHovered ? '#f0f0f0' : 'transparent',
             borderRadius: '50%',
             padding: '5px',
             display: 'flex',
             transition: 'background-color 0.2s'
           }}
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
           onClick={handleInfoClick}
         >
           <IoInformationCircle 
             size={28} 
             color="#007bff"
             style={{ 
               transition: 'transform 0.2s',
               transform: isHovered ? 'scale(1.4)' : 'scale(1)'
             }} 
           />
         </div>
       </h1>
       <ButtonGroup ref={buttonContainerRef} items ={ButtonList} onButtonClick={handleButtonClick} selectedButton={selectedButton}/>
    </div>

    {/* Info Popover */}
    <Popover
      open={Boolean(infoAnchorEl)}
      anchorEl={infoAnchorEl}
      onClose={handleInfoClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{
        '& .MuiPopover-paper': {
          borderRadius: '11px',
          border: '1px solid #ccc',
          padding: '10px',
          maxWidth: '300px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        },
      }}
    >
      <div>
        <Typography variant="h6" sx={{ mb: 1 }}>Expiration Status</Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <FaCircle className='text-danger' style={{ marginRight: '10px' }} />
          <Typography>Expired!!</Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <FaCircle className='text-warning' style={{ marginRight: '10px' }} />
          <Typography>Will expire within 3 days</Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <FaCircle className='text-primary' style={{ marginRight: '10px' }} />
          <Typography>Will expire within 7 days</Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaCircle className='text-success' style={{ marginRight: '10px' }} />
          <Typography>Will expire in more than 7 days</Typography>
        </div>
      </div>
    </Popover>

     {/* Search Popup */}
     {showSearchPopup && (
          <div style={{ 
            position: 'absolute',
            zIndex: 1000,
            marginTop: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
            <StorageSearchComponent 
              items={items.map(item => ({
                ...item,
                element: [
                  <FaCircle className={getExpirationClass(item.expireDate)} />,
                  item.name,
                  item
                ]
              }))}
              onItemClick={handleSearchItemClick} 
            />
          </div>
        )}

        {/* Filter Popover */}
              <Popover
                open={Boolean(filterAnchorEl)}
                anchorEl={filterAnchorEl}
                onClose={() => {
                  setFilterAnchorEl(null);
                  setSelectedButton(-1);
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  '& .MuiPopover-paper': {
                    borderRadius: '11px',
                    border: '3px solid ',
                    marginTop: '2px',
                  },
                }}
              >
                <Paper sx={{ p: 2, width: 250, maxHeight: 400, overflow: 'auto' }}>
                  <Typography variant="h6">Category</Typography>
                  {allCategories.map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          checked={filterCategory.includes(category)}
                          onChange={() => toggleFilter('category', category)}
                        />
                      }
                      label={category}
                    />
                  ))}
                  
                  <Typography variant="h6" sx={{ mt: 2 }}>Storage Type</Typography>
                  {allStorageTypes.map((type) => (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          checked={filterStorageType.includes(type)}
                          onChange={() => toggleFilter('storageType', type)}
                        />
                      }
                      label={type}
                    />
                  ))}
                </Paper>
              </Popover>
              {/* Item List */}
    <ul class="list-group list-group-flush ">
        {itemList.map((item, index) => 
          <li className='list-group-item list-group-item-action' 
              style={{ 
                position: 'relative',
                transition: 'background-color 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
          >
            <div class="container text-left">
              <div class="row">
                    <div class="col-1">
                        {item[0]}
                    </div>
                    <div class="col-8">
                        <div>{item[1]}</div>
                        <div style={{ fontSize: '0.8em', color: '#666' }}>
                          {getExpirationText(item[2].expireDate)}
                        </div>
                    </div>
                    <div class="col-1" style={{marginRight:"12px"}}>
                      <button 
                        type="button" 
                        style={{
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#ffebee',
                          border: '1px solid #ff5252',
                          color: '#ff5252'
                        }} 
                        onClick={()=>deleteItem(item)}
                      >
                        <Delete/>
                      </button>
                    </div>
                    <div class="col-1">
                      <button 
                        type="button" 
                        style={{
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#fff8e1',
                          border: '1px solid #ffa000',
                          color: '#ffa000'
                        }} 
                        onClick={()=>moveToWaste(item)}
                      >
                        <GiFishbone/>
                      </button>
                    </div>
                </div>
            </div>
          </li>
        )}
                    
                </ul>

                 {/* Confirmation Dialog */}
                      <Dialog
                        open={confirmDialogOpen}
                        onClose={() => setConfirmDialogOpen(false)}
                      >
                        <DialogTitle>
                          {deleteAction === 'waste' ? 'Confirm Waste' : 
                           deleteAction === 'save' ? 'Confirm Update' : 'Confirm Delete'}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            {deleteAction === 'checked' 
                              ? 'Are you sure you want to delete all checked items?' 
                              : deleteAction === 'waste'
                                ? 'Are you sure this item is wasted?'
                                : deleteAction === 'save'
                                  ? 'Are you sure you want to update this item?'
                                  : 'Are you sure you want to delete this item?'}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
                          <Button 
                            onClick={confirmDelete} 
                            color={deleteAction === 'waste' ? 'warning' : 
                                  deleteAction === 'save' ? 'primary' : 'error'} 
                            autoFocus
                          >
                            {deleteAction === 'waste' ? 'Confirm' : 
                             deleteAction === 'save' ? 'Update' : 'Delete'}
                          </Button>
                        </DialogActions>
                      </Dialog>
    </div>
  )
}

export default ExpireList