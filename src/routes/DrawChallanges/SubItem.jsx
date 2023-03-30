import React from 'react'
import { ListItem } from '@mui/material'
import SubItemContent from './SubItemContent'
import SecondaryActionDefault from './SecondaryActionDefault'

const SubItem = ({ index, style, data: { resources } }) => (
  <ListItem
    style={style}
    key={index}
    secondaryAction={<SecondaryActionDefault editAction={() => {}} deleteAction={() => {}} />}
  >
    <SubItemContent resource={resources[index]} />
  </ListItem>
)

export default SubItem
