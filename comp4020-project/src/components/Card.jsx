import { Link } from "react-router-dom";
import { Popover } from "bootstrap";

//card-title, card-text, card-icon, card Link
function Card(props){
  return(
  
    <div className={props.className} style={{width: "8.5rem"}} >
      <div className="card-body">
        <h1 className="card-title">{props.title}</h1>
        <p className="card-text">{props.text}</p>
      </div>
      
    </div>
);
}
export default Card;