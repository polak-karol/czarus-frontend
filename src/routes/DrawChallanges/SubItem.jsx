import React from 'react'
import { ListItem, ListItemText } from '@mui/material'

const SubItem = ({ index, style, data: { resources } }) => (
  <ListItem style={style} key={index} secondaryAction={() => {}}>
    <ListItemText key={resources[index]} primary={resources[index]} />
  </ListItem>
)

export default SubItem
