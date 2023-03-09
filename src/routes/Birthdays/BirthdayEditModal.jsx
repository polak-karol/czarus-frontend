import React from 'react'
import { Form, Formik } from 'formik'
import moment from 'moment'
import Button from '@mui/material/Button'
import { DatePicker } from '@mui/x-date-pickers'
import {
  Dialog,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Switch,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import agent from '../../api/agent'

const BirthdayEditModal = ({
  open,
  onClose,
  selectedBirthday,
  refreshBirthdayList,
  setRefreshBirthdayList,
}) => {
  const editBirthdayError = (error) => {
    console.log(error)
  }

  const editBirthdaySuccess = (response) => {
    console.log(response)
    setRefreshBirthdayList(!refreshBirthdayList)
    onClose()
  }

  const editBirthday = ({ date, isAnonymous }) => {
    console.log(isAnonymous)
    agent.Birthdays.updateBirthday('guild_id', {
      date: date.toISOString(),
      isAnonymous,
      userId: selectedBirthday.userId,
    }).then(editBirthdaySuccess, editBirthdayError)
  }

  return (
    <Formik
      initialValues={{
        date: moment(selectedBirthday.date),
        isAnonymous: selectedBirthday.isAnonymous,
      }}
      onSubmit={editBirthday}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Update</DialogTitle>
          <DialogContent>
            <Stack gap={3}>
              <DialogContentText>Update birthday date and anonyomus property.</DialogContentText>
              <Form>
                <Stack gap={1.5}>
                  <FormGroup>
                    <FormLabel>Date</FormLabel>
                    <DatePicker
                      format="DD/MM/YYYY"
                      onChange={(value) => setFieldValue('date', value)}
                      value={values.date}
                      disableFuture
                    />
                  </FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={(event) => setFieldValue('isAnonymous', event.target.checked)}
                        aria-label="Anonymous"
                        value={values.isAnonymous}
                        defaultValue={values.isAnonymous}
                      />
                    }
                    label="Anonymous"
                    labelPlacement="end"
                  />
                </Stack>
              </Form>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} color="secondary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  )
}

export default BirthdayEditModal
