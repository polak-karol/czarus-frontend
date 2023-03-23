import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const MenuListSegment = ({ paths, open }) => (
  <List>
    {paths.map(({ name, url, icon }) => (
      <ListItem key={name} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={Link}
          to={url}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
)

export default MenuListSegment
