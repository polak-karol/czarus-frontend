import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import agent from '~/api/agent'

const AddNewCategoryModal = ({ open, onClose, drawConfigs, setDrawConfigs }) => {
  const [categoryNameInput, setCategoryNameInput] = useState('')
  const { tab } = useParams()

  const updateDrawConfigsError = (error) => {
    console.log(error)
  }

  const updateDrawConfigsSuccess = (response) => {
    setDrawConfigs({ ...response.data })
    onClose()
    setCategoryNameInput('')
  }

  const updateDrawConfigs = (body) =>
    agent.Draws.updateDrawConfigs('guild_id', body).then(
      updateDrawConfigsSuccess,
      updateDrawConfigsError,
    )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">New category</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure that you want permamently delete this birthday?
        </DialogContentText>
        <TextField
          fullWidth
          label="Category name"
          variant="standard"
          value={categoryNameInput}
          onChange={(event) => setCategoryNameInput(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="secondary"
          disabled={!categoryNameInput}
          onClick={() => {
            const copyDrawConfigs = { ...drawConfigs }
            if (!copyDrawConfigs[`${tab}Config`]) {
              copyDrawConfigs[`${tab}Config`] = {}
            }

            copyDrawConfigs[`${tab}Config`][categoryNameInput] = []
            updateDrawConfigs(copyDrawConfigs)
          }}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddNewCategoryModal
