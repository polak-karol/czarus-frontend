import React, { useState } from 'react'
import { DeleteRounded, EditRounded, MoreVertRounded } from '@mui/icons-material'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'

const CardHeaderActions = ({ editAction, deleteAction }) => {
  const [cardHeaderActionsElement, setCardHeaderActionsElement] = useState(null)

  return (
    <div>
      <IconButton onClick={(event) => setCardHeaderActionsElement(event.currentTarget)}>
        <MoreVertRounded />
      </IconButton>
      <Menu
        anchorEl={cardHeaderActionsElement}
        open={!!cardHeaderActionsElement}
        onClose={() => setCardHeaderActionsElement(null)}
      >
        <MenuItem onClick={editAction}>
          <ListItemIcon>
            <EditRounded />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={deleteAction}>
          <ListItemIcon>
            <DeleteRounded />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default CardHeaderActions
