import React from "react";

//card-title, card-text, card-icon, card Link
function Card(props){
   
  return(
  
    <div className={props.className} style={props.cardStyle} >
      <div className="card-body" 
      style={props.bodyStyle} 
      aria-describedby={props.popId} 
      variant={props.popVariant} 
      onClick={props.popOnClick}>
        <h1 className="card-title">{props.title}</h1>
        <p className="card-text">{props.text}</p>
      </div>
      {props.additional}
    </div>
);
}
export default Card;