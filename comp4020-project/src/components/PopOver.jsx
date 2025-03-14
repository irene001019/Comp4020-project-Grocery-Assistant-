import React from 'react'
import { Popover, Typography } from '@mui/material'

const PopOver = (props) => {

  return (
    <div> 
    <Popover
    id={props.id}
    open={props.open}
    anchorEl={props.anchorEl}
    onClose={props.onClose}
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
  </Popover></div>
  )
}

export default PopOver