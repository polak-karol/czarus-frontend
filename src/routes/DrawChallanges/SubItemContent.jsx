import React from 'react'
import { ListItemText, TextField } from '@mui/material'

const SubItemContent = ({
  resources,
  index,
  editMode,
  selectedDrawConfigInput,
  setSelectedDrawConfigInput,
}) =>
  editMode ? (
    <TextField
      variant="standard"
      value={selectedDrawConfigInput}
      onChange={(event) => setSelectedDrawConfigInput(event.target.value)}
    />
  ) : (
    <ListItemText primary={resources[index]} />
  )

export default SubItemContent
