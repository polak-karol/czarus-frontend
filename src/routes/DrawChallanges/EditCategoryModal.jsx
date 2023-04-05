import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import agent from '~/api/agent'
import { getDrawConfigsWithChangedSubItemName } from './utils'

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
    onClose()
  }

  const updateDrawConfigs = (body) =>
    agent.Draws.updateDrawConfigs('guild_id', body).then(
      updateDrawConfigsSuccess,
      updateDrawConfigsError,
    )

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit category</DialogTitle>
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
          onClick={() =>
            updateDrawConfigs(
              getDrawConfigsWithChangedSubItemName(
                drawConfigs,
                tab,
                drawConfigItemKey,
                editCategoryNameInput,
              ),
            )
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditCategoryModal
