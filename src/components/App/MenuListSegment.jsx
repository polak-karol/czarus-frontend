import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { MoveToInbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material'

const MenuListSegment = ({ paths, open }) => (
  <List>
    {paths.map(({ name, url }, index) => (
      <ListItem key={name} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          LinkComponent={Link}
          href={url}
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
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
)

export default MenuListSegment
