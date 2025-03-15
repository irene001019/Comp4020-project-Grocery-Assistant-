import React from 'react'; 

//{input: items[], title}

function ListGroup(props){
   
     // Delete an item from the list
 
    return (
        <>
            <ul class="list-group list-group-flush ">
                {props.items.map((item) => 
                <li 
                    className='list-group-item list-group-item-action' >
                    <div class="container text-left">
            <div class="row">
                <div class="col-1">
                    {item[0]}
                </div>
                <div class="col-8">
                    {item[1]}
                </div>
               
            </div>
        </div>
                </li>
            )}
                
            </ul>
        </>
    );
}

export default ListGroup;