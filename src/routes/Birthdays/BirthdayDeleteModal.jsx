import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import agent from '../../api/agent'

const BirthdayDeleteModal = ({ open, onClose, selectedBirthday, setBirthdaysList }) => {
  const deleteBirthdaySuccess = () => {
    setBirthdaysList((state) => state.filter((value) => value.id !== selectedBirthday.id))
    onClose()
  }

  const deleteBirthdayError = (error) => {
    console.log(error)
  }

  const deleteBirthday = () => {
    agent.Birthdays.deleteBirthday(selectedBirthday.guildId, selectedBirthday.userId).then(
      deleteBirthdaySuccess,
      deleteBirthdayError,
    )
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure that you want permamently delete this birthday?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        <Button color="error" onClick={deleteBirthday} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BirthdayDeleteModal
