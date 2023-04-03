import React from 'react'
import { ListItemText, TextField } from '@mui/material'

const SubItemContent = ({
  resources,
  index,
  selectedDrawConfigIndex,
  selectedDrawConfigType,
  selectedDrawConfigInput,
  setSelectedDrawConfigInput,
  resourcesKey,
}) =>
  selectedDrawConfigIndex === index && selectedDrawConfigType === resourcesKey ? (
    <TextField
      variant="standard"
      value={selectedDrawConfigInput}
      onChange={(event) => setSelectedDrawConfigInput(event.target.value)}
    />
  ) : (
    <ListItemText primary={resources[index]} />
  )

export default SubItemContent
