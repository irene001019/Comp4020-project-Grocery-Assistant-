import React from 'react'
import { useState } from 'react';
import ButtonGroup from '../components/ButtonGroup';
import { FaCircle } from "react-icons/fa";
import { GiFishbone } from "react-icons/gi";
import { FaRegTrashAlt } from "react-icons/fa"

const ExpireList = () => {
  
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

  const deleteItem = (index) => {
    setItemList(itemList.filter((_, i) => i !== index)); // Remove item at index
  };

  return (
    <div>
    <div className='container text-center'>
       <h1 >Expire List</h1>
       <ButtonGroup items ={ButtonList}/>
    </div>
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
                    <button type="button" class="btn btn-light" onClick={()=>deleteItem(index)}><FaRegTrashAlt/></button>
                    </div>
                    <div class="col-1">
                    <button type="button" class="btn btn-light" onClick={()=>deleteItem(index)}><GiFishbone/></button>
                    </div>
                </div>
            </div>
                    </li>
                )}
                    
                </ul>
    </div>
  )
}

export default ExpireList