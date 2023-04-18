import React, { useContext } from 'react'
import { Avatar, Box, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import UserContext from '~/contexts/UserContext'
import { AppBar, isTopBarHidden } from './utils'

const TopBar = ({ open, setOpen }) => {
  const { user } = useContext(UserContext)

  if (isTopBarHidden()) return null

  return (
    <AppBar position="fixed" open={open}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div">
              Czaruś
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Stack flexDirection="row" alignItems="center" gap=".5rem">
              <Typography>{user.username}</Typography>
              {user.avatar && (
                <Avatar
                  alt={user.username}
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                />
              )}
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
