import React from 'react'
import ShoppingListInputGroup from '../components/ShoppingListInputGroup'
import ButtonGroup from '../components/ButtonGroup';
import SimpleInputGroup from '../components/SimpleInputGroup';

const ShoppingList = () => {
  let simpleInputList =[
    "Total",
    "Budget",
    "Total-Budget"
  ];
  let ButtonList =[
    "Upload",
    "Search",
    "Edit"
  ];
  return (
    <div>
      <div className='container text-center'>
        <h1 >Shopping List</h1>
        <ButtonGroup items ={ButtonList}/>
      </div>
      <ShoppingListInputGroup/>
      {/* total and budget */}
      <SimpleInputGroup items={simpleInputList}/>
    </div>
  )
}

export default ShoppingList
