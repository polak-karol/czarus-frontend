import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import UserContext from '~/contexts/UserContext'
import LogoutConfirmationModal from './LogoutConfirmationModal'

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const navigate = useNavigate()
  const [logoutConfirmationModalActive, setLogoutConfirmationModalActive] = useState(false)
  const { user } = useContext(UserContext)

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)

  const handleCloseUserMenu = () => setAnchorElUser(null)

  if (!user?.avatar) return

  return (
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
        <MenuItem onClick={() => navigate('/profile')}>
          <Typography textAlign="left">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => setLogoutConfirmationModalActive(true)}>
          <Typography textAlign="left">Logout</Typography>
        </MenuItem>
      </Menu>
      <LogoutConfirmationModal
        open={logoutConfirmationModalActive}
        onClose={() => setLogoutConfirmationModalActive(false)}
      />
    </>
  )
}

export default UserMenu
