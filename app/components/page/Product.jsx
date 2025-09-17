import React from 'react'
import {Menu, MenuItem} from "@mui/material";

function Product() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
  {(popupState) => (
    <React.Fragment>
      
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Fruits</MenuItem>
        <MenuItem onClick={popupState.close}>Vegetables</MenuItem>
        <MenuItem onClick={popupState.close}>Frozen Food</MenuItem>
        <MenuItem onClick={popupState.close}>Snacks</MenuItem>
        <MenuItem onClick={popupState.close}>Drinks</MenuItem>
        <MenuItem onClick={popupState.close}>Meats & Fish</MenuItem>
      </Menu>
    </React.Fragment>
  )}
</PopupState>
    
  )
}

export default Product