import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
import agent from '~/api/agent'

const UpdateHolidayModal = ({ open, onClose, handleSubmit, date }) => {
  const updateHoliday = () => {
    agent.Holidays.updateHolidays()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update</DialogTitle>
      <DialogContent>
        <Stack direction="column" gap="3rem">
          <DialogContentText>Update holiday on specific day.</DialogContentText>
          <Stack direction="column" gap="2rem">
            <DateField variant="standard" label="Controlled field" defaultValue={date} readOnly />
            <TextField label="Message" multiline rows={4} variant="standard" />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="secondary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateHolidayModal
