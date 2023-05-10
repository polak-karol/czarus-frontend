import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { deleteCookie } from '~/utils/global-functions'

const LogoutConfirmationModal = ({ open, onClose }) => {
  const handleLogout = () => {
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    window.location.reload()
  }

  if (!open) return

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to logout?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleLogout()} color="error">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogoutConfirmationModal
