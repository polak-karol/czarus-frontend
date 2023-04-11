import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const AgreementModal = ({
  open,
  onClose,
  agreeAction,
  title = 'Are you sure?',
  content = 'Are you sure you want to proceed with this action?',
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button color="secondary" onClick={agreeAction}>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
)

export default AgreementModal
