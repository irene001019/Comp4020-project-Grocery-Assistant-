import { useState } from "react";
import React from 'react'; 

//{input: items[], title}

function ListGroup(props){
    const [selectedItem, setSelectedItem] = useState(-1);

    return (
        <>
            <ul class="list-group list-group-flush">
                {props.items.map((item, index) => 
                <li 
                className={selectedItem === index ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} 
                onClick={() => { setSelectedItem(index); }}>
                    {item}
                </li>)}
            </ul>
        </>
    );
}

export default ListGroup;