import React, { useState } from 'react'
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

const UpdateHolidayModal = ({ open, onClose, date }) => {
  const [message, setMessage] = useState('')

  const updateHolidayError = (error) => {
    console.log(error)
  }

  const updateHolidaySuccess = (response) => {
    console.log(response)
  }

  const updateHoliday = () => {
    const body = {
      message,
      date: date.toISOString(),
    }
    agent.Holidays.updateHolidays('guild_id', body).then(updateHolidaySuccess, updateHolidayError)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update</DialogTitle>
      <DialogContent>
        <Stack direction="column" gap="3rem">
          <DialogContentText>Update holiday on specific day.</DialogContentText>
          <Stack direction="column" gap="2rem">
            <DateField variant="standard" label="Date" defaultValue={date} readOnly />
            <TextField
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              label="Message"
              multiline
              rows={4}
              variant="standard"
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => updateHoliday()} color="secondary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateHolidayModal
