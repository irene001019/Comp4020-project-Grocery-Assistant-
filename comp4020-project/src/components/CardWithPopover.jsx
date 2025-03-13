import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Card from "./Card";

//card-title, card-text, card-icon, card Link
function CardWithPopover(props){
   const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
  return(
  
    <div className={props.className} style={props.cardStyle} >
      <div className="card-body" 
        style={props.bodyStyle} aria-describedby={id} variant="contained" onClick={handleClick}>
        <h1 className="card-title">{props.icon}</h1>
        <p className="card-text">{props.text}</p>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 2 }}>
       {props.popoverContext}
        </Typography>
      </Popover>
    </div>
);
}
export default CardWithPopover;