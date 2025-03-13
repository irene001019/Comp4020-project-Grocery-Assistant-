import React from 'react'
import ListGroup from '../components/ListGroup'
import ButtonGroup from '../components/ButtonGroup';

const StorageList = () => {
  let itemList = [
    "meow"
  ];
  let ButtonList =[
    "Filter",
    "Search",
    "Edit"
  ];
  return (
    <div>
    <div className='container text-center'>
       <h1 >Storage List</h1>
       <ButtonGroup items ={ButtonList}/>
    </div>
    <ListGroup items={itemList} />
    </div>
  )
}

export default StorageList