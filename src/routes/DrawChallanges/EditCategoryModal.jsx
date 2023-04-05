import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import agent from '~/api/agent'

const EditCategoryModal = ({
  open,
  onClose,
  setDrawConfigs,
  drawConfigs,
  editCategoryNameInput,
  setEditCategoryNameInput,
  drawConfigItemKey,
}) => {
  const { tab } = useParams()

  const updateDrawConfigsError = (error) => {
    console.log(error)
  }

  const updateDrawConfigsSuccess = (response) => {
    setDrawConfigs({ ...response.data })
    setEditCategoryNameInput('')
    onClose()
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
      <DialogTitle id="alert-dialog-title">Edit category</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Category name"
          variant="standard"
          value={editCategoryNameInput}
          onChange={(event) => setEditCategoryNameInput(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="secondary"
          disabled={!editCategoryNameInput}
          onClick={() => {
            const copyDrawConfigs = { ...drawConfigs }
            copyDrawConfigs[`${tab}Config`] = Object.fromEntries(
              Object.entries(copyDrawConfigs[`${tab}Config`]).map(([key, value]) => {
                if (key !== drawConfigItemKey) return [key, value]

                return [editCategoryNameInput, value]
              }),
            )
            updateDrawConfigs(copyDrawConfigs)
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditCategoryModal
