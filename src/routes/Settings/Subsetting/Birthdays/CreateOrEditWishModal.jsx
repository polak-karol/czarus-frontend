import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { Formik } from 'formik'

const CreateOrEditWishModal = ({ active, onClose }) => (
  <Formik initialValues={{}}>
    {() => (
      <Dialog open={active} onClose={onClose}>
        <DialogTitle>Edit wish</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="wish"
            label="Wish"
            fullWidth
            multiline
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    )}
  </Formik>
)

export default CreateOrEditWishModal
