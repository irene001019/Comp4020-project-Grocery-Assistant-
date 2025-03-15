import React from 'react'
import { useState, useRef, useEffect } from 'react';
import ButtonGroup from '../components/ButtonGroup';
import StorageSearchComponent from '../components/StorageSearchComponent';
import { FaCircle } from "react-icons/fa";
import { GiFishbone } from "react-icons/gi";
import {
  Checkbox,  Typography, Popover,
  FormControlLabel, Paper,  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
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
  
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [showSearchPopup, setShowSearchPopup] = useState(false);  
    
   
  const [itemList, setItemList] = useState([
    [<FaCircle className='text-danger'/>, "Milk"],
    [<FaCircle className='text-danger'/>, "Cabbage"],
    [<FaCircle className='text-danger'/>, "Strawberries"],
    [<FaCircle className='text-warning'/>, "Fish"],
    [<FaCircle className='text-warning'/>, "Cheese"],
    [<FaCircle className='text-warning'/>, "Yogurt"],
    [<FaCircle className='text-warning'/>, "Bread"],
    [<FaCircle className='text-success'/>, "Chicken Thigh"],
    [<FaCircle className="text-success"/>, "Carrots"],
    [<FaCircle className="text-success"/>, "Apples"]
  ]);

  let ButtonList =[
    "Filter",
    "Search"
  ];

  const allCategories = ["Fruit", "Vegetable", "Meat", "Dairy", "Beverage", "Baking", "Frozen"];
  const allStorageTypes = ["Fridge", "Freezer", "Pantry"];

    const buttonContainerRef = useRef(null);

  const handleButtonClick = (index, buttonName) => {    
    if (buttonName === 'Filter') {
      const filterButton = buttonContainerRef.current.querySelector('button:nth-child(1)');
      setFilterAnchorEl(filterButton);
      setSelectedButton(index); 
      setShowSearchPopup(false);
    }  else if (buttonName === 'Search') {
      setShowSearchPopup(!showSearchPopup);
      setFilterAnchorEl(null);
      setSelectedButton(showSearchPopup ? -1 : index);
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
      setItemList(itemList.filter(item => !item.checked));
    } else if (deleteAction === 'single' && selectedItem) {
      setItemList(itemList.filter(i => i !== selectedItem));
    } else if (deleteAction === 'save') {
      setItemList(itemList.map(item => 
        item.index === editedItem.index ? editedItem : item
      ));
      setSelectedItem(editedItem);
    }
    setConfirmDialogOpen(false);
  };

  const deleteItem = (item) => {
    setSelectedItem(item);
    // setItemList(itemList.filter((_, i) => i !== index)); // Remove item at index
    handleDeleteConfirm('single');
  };
 ;
 
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

  return (
    <div>
    <div className='container text-center'>
       <h1 >Expire List</h1>
       <ButtonGroup items ={ButtonList} onButtonClick={handleButtonClick} selectedButton={selectedButton}/>
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
              items={itemList} 
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
          <li className='list-group-item list-group-item-action' >
            <div class="container text-left">
              <div class="row">
                    <div class="col-1">
                        {item[0]}
                    </div>
                    <div class="col-8">
                        {item[1]}
                    </div>
                    <div class="col-1" style={{marginRight:"12px"}}>
                    <button type="button" class="btn btn-light" onClick={()=>deleteItem(selectedItem)}><Delete/></button>
                    </div>
                    <div class="col-1">
                    <button type="button" class="btn btn-light" onClick={()=>deleteItem(selectedItem)}><GiFishbone/></button>
                    </div>
                </div>
            </div>
                    </li>
                )
                }
                    
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