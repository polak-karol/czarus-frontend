import React from 'react'
import { Formik } from 'formik'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const BirthdayEditModal = ({ open, onClose }) => {
  const editBirthday = () => {}

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <Formik initialValues={{ userId: '' }}>
            {({ values, setFieldValue }) => (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(event) => {
                  console.log(event)
                  setFieldValue(event.target.value)
                }}
                value={values.userId}
              />
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BirthdayEditModal
