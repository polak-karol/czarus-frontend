import React from 'react'
import { Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, isTopBarHidden } from './utils'
import UserMenu from './UserMenu'

const TopBar = ({ open, setOpen }) => {
  if (isTopBarHidden()) return null

  return (
    <AppBar position="fixed" open={open}>
      <Container maxWidth="xl">
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
            <MenuIcon />
          </IconButton>
          <Stack
            style={{ width: '100%' }}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" noWrap component="div">
              Czaruś
            </Typography>
          </Stack>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
