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
  const deleteBirthdaySuccess = (response) => {
    console.log(response)
    setBirthdaysList((state) => state.filter((value) => value.userId !== selectedBirthday.userId))
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
      <DialogTitle id="alert-dialog-title">Use Google's location service?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
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
