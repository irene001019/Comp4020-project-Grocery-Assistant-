import React, { useState, useRef, useEffect } from 'react';
import ButtonGroup from '../components/ButtonGroup';
import StorageSearchComponent from '../components/StorageSearchComponent';
import {
  List, ListItem, ListItemIcon, ListItemText, 
  Checkbox, IconButton, Typography, Popover,
  FormControlLabel, Box, Divider, Paper, TextField, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Delete, ChevronRight, Edit, ArrowBack, Save, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { GiFishbone } from "react-icons/gi";

const StorageList = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('storageItems');
    console.log('StorageList - savedItems:', savedItems);
    //Add 6 items one that is expired ,one that is expiring within 3 days and 2 that are expiring within 7 days and 2 that are expiring within 14 days like differnt items 
    const defaultItems = [
      { id: 1, name: 'Banana', checked: true, category: 'Fruit', storageType: 'Fridge', purchaseDate: '2025-03-10', expireDate: '2025-03-20', price: '$3', amount: '3' },
      { id: 2, name: 'Yogurt', checked: true, category: 'Dairy', storageType: 'Fridge', purchaseDate: '2025-03-12', expireDate: '2025-03-19', price: '$4', amount: '1' },
      { id: 3, name: 'Pepsi', checked: true, category: 'Beverage', storageType: 'Fridge', purchaseDate: '2025-03-05', expireDate: '2025-03-25', price: '$2', amount: '1' },
      { id: 4, name: 'Fish', checked: true, category: 'Meat', storageType: 'Freezer', purchaseDate: '2025-03-08', expireDate: '2025-04-08', price: '$8', amount: '2' },
      { id: 5, name: 'Milk', checked: true, category: 'Dairy', storageType: 'Fridge', purchaseDate: '2025-03-15', expireDate: '2025-03-22', price: '$5', amount: '1' },
      { id: 6, name: 'Eggs', checked: true, category: 'Dairy', storageType: 'Pantry', purchaseDate: '2025-03-15', expireDate: '2025-03-25', price: '$4', amount: '12' },
      { id: 7, name: 'Cheese', checked: true, category: 'Dairy', storageType: 'Fridge', purchaseDate: '2025-03-15', expireDate: '2025-03-17', price: '$7', amount: '1' },
      { id: 8, name: 'Tomato', checked: true, category: 'Vegetable', storageType: 'Fridge', purchaseDate: '2025-03-12', expireDate: '2025-03-13', price: '$2', amount: '3' },
      { id: 9, name: 'Carrot', checked: true, category: 'Vegetable', storageType: 'Fridge', purchaseDate: '2025-03-12', expireDate: '2025-03-12', price: '$3', amount: '5' },
      { id: 10, name: 'Potato', checked: true, category: 'Vegetable', storageType: 'Fridge', purchaseDate: '2025-03-15', expireDate: '2025-04-02', price: '$5', amount: '6' },
      { id: 11, name: 'Beef', checked: true, category: 'Meat', storageType: 'Freezer', purchaseDate: '2025-03-15', expireDate: '2025-03-17', price: '$12', amount: '2' },
      { id: 14, name: 'Chicken', checked: true, category: 'Meat', storageType: 'Freezer', purchaseDate: '2025-03-15', expireDate: '2025-04-06', price: '$10', amount: '2' },
    ];
    const result = savedItems ? JSON.parse(savedItems) : defaultItems;
    console.log('StorageList - using items:', result);
    return result;
  });

  useEffect(() => {
    localStorage.setItem('storageItems', JSON.stringify(items));
  }, [items]);

  const [selectedButton, setSelectedButton] = useState(-1); 

  const [selectedItem, setSelectedItem] = useState(null); 
  const [editedItem, setEditedItem] = useState({}); 
  const [itemEditMode, setItemEditMode] = useState(false); 

  const [filterAnchorEl, setFilterAnchorEl] = useState(null); 
  const [filterCategory, setFilterCategory] = useState([]); 
  const [filterStorageType, setFilterStorageType] = useState([]); 

  const [detailsAnchorEl, setDetailsAnchorEl] = useState(null); 
  const [editMode, setEditMode] = useState(false); 
  
  const [showSearchPopup, setShowSearchPopup] = useState(false);  
  
  const [wasteItems, setWasteItems] = useState(() => {
    const savedWasteItems = localStorage.getItem('wasteItems');
    return savedWasteItems ? JSON.parse(savedWasteItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('wasteItems', JSON.stringify(wasteItems));
  }, [wasteItems]);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState(null);

  const buttonContainerRef = useRef(null);

  const ButtonList = ["Filter", "Search", "Edit"];

  const allCategories = ["Fruit", "Vegetable", "Meat", "Dairy", "Beverage", "Baking", "Frozen"];
  const allStorageTypes = ["Fridge", "Freezer", "Pantry"];


  const handleButtonClick = (index, buttonName) => {    
    if (buttonName === 'Filter') {
      const filterButton = buttonContainerRef.current.querySelector('button:nth-child(1)');
      setFilterAnchorEl(filterButton);
      setSelectedButton(index); 
      setEditMode(false);
      setShowSearchPopup(false);
      setDetailsAnchorEl(null);
    } else if (buttonName === 'Edit') {
      setEditMode(!editMode);
      setFilterAnchorEl(null);
      setShowSearchPopup(false);
      setDetailsAnchorEl(null);
      setSelectedButton(editMode ? -1 : index);
    } else if (buttonName === 'Search') {
      setShowSearchPopup(!showSearchPopup);
      setFilterAnchorEl(null);
      setEditMode(false);
      setDetailsAnchorEl(null);
      setSelectedButton(showSearchPopup ? -1 : index);
    }
  };

  const toggleItemCheck = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const showDetails = (item, event) => {
    setSelectedItem(item);
    setDetailsAnchorEl(event.currentTarget);
    setEditedItem({...item});
  };

  const closeDetails = () => {
    setDetailsAnchorEl(null);
    setItemEditMode(false);
  };

  const handleSearchItemClick = (item) => {
    setSelectedItem(item);
    setShowSearchPopup(false);
    setDetailsAnchorEl(items.find(i => i.id === item.id));
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
      setItems(items.filter(i => i.id !== selectedItem.id));
      setDetailsAnchorEl(null);
    } else if (deleteAction === 'waste' && selectedItem) {
      setWasteItems([...wasteItems, selectedItem]);
      setItems(items.filter(i => i.id !== selectedItem.id));
      setDetailsAnchorEl(null);
    } else if (deleteAction === 'save') {
      setItems(items.map(item => 
        item.id === editedItem.id ? editedItem : item
      ));
      setSelectedItem(editedItem);
      setItemEditMode(false);
    }
    setConfirmDialogOpen(false);
  };

  const deleteItem = (item) => {
    setSelectedItem(item);
    handleDeleteConfirm('single');
  };

  const deleteCheckedItems = () => {
    handleDeleteConfirm('checked');
  };

  const moveToWaste = (item) => {
    setSelectedItem(item);
    handleDeleteConfirm('waste');
  };

  const toggleItemEditMode = () => {
    if (itemEditMode) {
      setEditedItem({...selectedItem});
    }
    setItemEditMode(!itemEditMode);
  };

  const saveEditedItem = () => {
    const hasChanges = JSON.stringify(selectedItem) !== JSON.stringify(editedItem);
    
    if (hasChanges) {
      handleDeleteConfirm('save');
    } else {
      setItemEditMode(false);
    }
  };

  const getFilteredItems = () => {
    if (filterCategory.length === 0 && filterStorageType.length === 0) {
      return items;
    }
    
    return items.filter(item => {
      const categoryMatch = filterCategory.length === 0 || filterCategory.includes(item.category);
      const storageMatch = filterStorageType.length === 0 || filterStorageType.includes(item.storageType);
      return categoryMatch && storageMatch;
    });
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

  const handleItemChange = (name, value) => {
    setEditedItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const moveItem = (id, direction) => {
    const itemIndex = items.findIndex(item => item.id === id);
    if ((direction === 'up' && itemIndex === 0) || 
        (direction === 'down' && itemIndex === items.length - 1)) {
      return;
    }
    
    const newItems = [...items];
    const targetIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
    
    [newItems[itemIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[itemIndex]];
    setItems(newItems);
  };

  const editItemFromList = (item) => {
    setSelectedItem(item);
    setEditedItem({...item});
    setDetailsAnchorEl(document.getElementById(`item-${item.id}`));
    setItemEditMode(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
     
     
      {/* Header */}
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h4" sx={{ color: 'black', mb: 2 , fontWeight: 'bold'}}>Storage</Typography>
        <div ref={buttonContainerRef}>
          <ButtonGroup items={ButtonList} onButtonClick={handleButtonClick} selectedButton={selectedButton} />
        </div>
        
       

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
              items={items} 
              onItemClick={handleSearchItemClick} 
            />
          </div>
        )}
      </Box>
      

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

      {/* Items List */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Items</Typography>
        {!editMode && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={deleteCheckedItems}
            sx={{ fontSize: '0.8rem', py: 0.5 }}
          >
            Done
          </Button>
        )}
      </Box>
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {getFilteredItems().map((item) => (
          <React.Fragment key={item.id}>
            <ListItem 
              id={`item-${item.id}`}
              secondaryAction={
                editMode ? (
                  <Box sx={{ display: 'flex' }}>
                    <IconButton 
                      edge="end"
                      color="primary"
                      onClick={() => editItemFromList(item)}
                      sx={{ mr: 0.5 }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      color="error"
                      onClick={() => deleteItem(item)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton onClick={(e) => showDetails(item, e)}>
                    <ChevronRight color="action" />
                  </IconButton>
                )
              }
            >
              {editMode ? (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                  <IconButton 
                    size="small"
                    onClick={() => moveItem(item.id, 'up')}
                    sx={{ p: 0.5 }}
                  >
                    <ArrowUpward fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small"
                    onClick={() => moveItem(item.id, 'down')}
                    sx={{ p: 0.5 }}
                  >
                    <ArrowDownward fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.checked}
                    onChange={() => toggleItemCheck(item.id)}
                  />
                </ListItemIcon>
              )}
              <ListItemText 
                primary={item.name}   
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

      {/* Item Details Modal */}
       <div style={{
        display:detailsAnchorEl ? 'block' : 'none',
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
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}>
          {selectedItem && (
            <Box sx={{ p: 2 }}>
              {/* Header with title and close button */}
              <Box sx={{ 
                display: 'flex', 
                pb: 2,
                mb: 2, 
                color: 'primary.main',  
              }}>
                {/* Back button on the left */}
                <Box sx={{ width: '15%' }}>
                  <IconButton  onClick={itemEditMode ? toggleItemEditMode : closeDetails}>
                    <ArrowBack/>
                  </IconButton>
                </Box>
                
                {/* Title in the center */}
                <Typography variant="h6" sx={{fontWeight: 'bold', textAlign: 'center', flex: 1 }}>
                  {itemEditMode ? 
                    <TextField 
                      fullWidth 
                      variant="standard" 
                      value={editedItem.name} 
                      onChange={(e) => handleItemChange('name', e.target.value)}
                      sx={{ input: { textAlign: 'center', fontWeight: 'bold', color: 'primary.main' } }}
                    /> : 
                    selectedItem.name
                  }
                </Typography>
                
                {/* Save on the right */}
                <Box>
                  {itemEditMode ? (
                    <IconButton onClick={saveEditedItem} color="primary">
                      <Save />
                    </IconButton>
                  ) : (
                    <IconButton onClick={toggleItemEditMode}>
                      <Edit />
                    </IconButton>
                  )}
                </Box>
              </Box>
              
              {/* Item details */}
              <Box sx={{ mb: 2 }}>
                {itemEditMode ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Purchased Date:</Typography>
                      <TextField 
                        type="date" 
                        size="small" 
                        value={editedItem.purchaseDate} 
                        onChange={(e) => handleItemChange('purchaseDate', e.target.value)}
                        sx={{ width: '65%' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Expire Date:</Typography>
                      <TextField 
                        type="date" 
                        size="small" 
                        value={editedItem.expireDate} 
                        onChange={(e) => handleItemChange('expireDate', e.target.value)}
                        sx={{ width: '65%' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Price:</Typography>
                      <TextField 
                        size="small" 
                        value={editedItem.price} 
                        type="text"
                        onChange={(e) => handleItemChange('price', e.target.value)}
                        sx={{ width: '65%' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Amount:</Typography>
                      <TextField 
                        size="small" 
                        value={editedItem.amount} 
                        type="text"
                        onChange={(e) => handleItemChange('amount', e.target.value)}
                        sx={{ width: '65%' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Category:</Typography>
                      <TextField 
                        select
                        size="small" 
                        value={editedItem.category} 
                        onChange={(e) => handleItemChange('category', e.target.value)}
                        sx={{ width: '65%' }}
                        slotProps={{
                          select: {
                            native: true,
                          },
                        }}
                      >
                        {allCategories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </TextField>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Storage Type:</Typography>
                      <TextField 
                        select
                        size="small" 
                        value={editedItem.storageType} 
                        onChange={(e) => handleItemChange('storageType', e.target.value)}
                        sx={{ width: '65%' }}
                        slotProps={{
                          select: {
                            native: true,
                          },
                        }}
                      >
                        {allStorageTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </TextField>
                    </Box>
                  </Box>
                ) : (
                 
                  <>
                  
                    <Typography sx={{ mb: 0.5 }}><strong>Purchased Date:</strong> {selectedItem.purchaseDate}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Expire Date:</strong> {selectedItem.expireDate}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Price:</strong> {selectedItem.price}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Amount:</strong> {selectedItem.amount}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Category:</strong> {selectedItem.category}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Storage Type:</strong> {selectedItem.storageType}</Typography>
                  </>
                )}
              </Box>
              
              {/* Action buttons - only show when not in edit mode */}
              {!itemEditMode && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  mt: 2,
                  pt: 1,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  gap: 4
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton 
                      color="error"
                      onClick={() => deleteItem(selectedItem)}
                      sx={{ border: '1px solid', borderColor: 'error.main', mb: 0.5 }}
                    >
                      <Delete />
                    </IconButton>
                    <Typography variant="caption" color="error.main">Delete</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton 
                      color="warning"
                      onClick={() => moveToWaste(selectedItem)}
                      sx={{ border: '1px solid', borderColor: 'warning.main', mb: 0.5 }}
                    >
                      <GiFishbone />
                    </IconButton>
                    <Typography variant="caption" color="warning.main">Waste</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </div>
      </div>

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
    </Box>
  );
};

export default StorageList;