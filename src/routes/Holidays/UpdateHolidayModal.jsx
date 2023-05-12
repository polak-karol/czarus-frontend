import React, { useState, useContext } from 'react'
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
import SelectedGuildContext from '~/contexts/SelectedGuildContext'

const UpdateHolidayModal = ({
  open,
  onClose,
  date,
  message,
  setMessage,
  setHolidaysData,
  holidaysData,
}) => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [loading, setLoading] = useState(false)

  const updateHolidayError = (error) => {
    console.log(error)
  }

  const updateHolidaySuccess = (response) => {
    if (holidaysData.some(({ id }) => id === response.data.id)) {
      setHolidaysData((state) =>
        state.map((item) => {
          if (item.id !== response.data.id) return item
          return response.data
        }),
      )
    } else {
      setHolidaysData((state) => {
        state.push(response.data)
        return state
      })
    }
    onClose()
  }

  const updateHoliday = () => {
    setLoading(true)
    const body = {
      message,
      date: date.toISOString(),
    }

    return agent.Holidays.updateHolidays(selectedGuild.id, body)
      .then(updateHolidaySuccess, updateHolidayError)
      .finally(() => setLoading(false))
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
              rows={4}
              multiline
              label="Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              variant="standard"
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={() => updateHoliday()} color="secondary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateHolidayModal
