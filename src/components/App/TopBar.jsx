import React, { useContext, useState } from 'react'
import {
  Avatar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import UserContext from '~/contexts/UserContext'
import { AppBar, isTopBarHidden } from './utils'

const TopBar = ({ open, setOpen }) => {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { user } = useContext(UserContext)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

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
            {user.avatar && (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleOpenUserMenu}
                  edge="start"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                >
                  <Avatar
                    alt={user.username}
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                  />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={!!anchorElUser}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => {}}>
                    <Typography textAlign="left">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <Typography textAlign="left">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
