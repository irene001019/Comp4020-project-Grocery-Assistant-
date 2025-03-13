import React from 'react'
import ButtonGroup from '../components/ButtonGroup';
import ListGroup from '../components/ListGroup';

const ExpireList = () => {
  let itemList = [
    "meow"
  ];
  let ButtonList =[
    "Filter",
    "Search"
  ];
  return (
    <div>
    <div className='container text-center'>
       <h1 >Expire List</h1>
       <ButtonGroup items ={ButtonList}/>
    </div>
    <ListGroup items={itemList} />
    </div>
  )
}

export default ExpireList