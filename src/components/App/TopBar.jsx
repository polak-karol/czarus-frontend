import React, { useContext } from 'react'
import { Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import UserContext from '~/contexts/UserContext'
import { AppBar, isTopBarHidden } from './utils'
import UserMenu from './UserMenu'

const TopBar = ({ open, setOpen }) => {
  const { user } = useContext(UserContext)

  if (isTopBarHidden(user)) return null

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
            <Typography variant="h6" noWrap component="h1">
              Czaruś - Discord Bot
            </Typography>
          </Stack>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
