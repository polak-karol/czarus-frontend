import React from 'react'
import { IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { AppBar, isTopBarHidden } from './utils'

const TopBar = ({ open, setOpen }) => {
  if (isTopBarHidden()) return null

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Czaruś
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
