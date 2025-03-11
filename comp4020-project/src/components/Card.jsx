//card-title, card-text, card-icon
function Card(props){
return(
    <div className="card " style={{width:'11rem',height:'11rem'}} >
  <div className="card-body">
  <h1 className="card-title">{props.icon}</h1>
    <h5 className="card-title ">{props.title}</h5>
    <p className="card-text">{props.text}</p>
  </div>
</div>
);

}

export default Card;