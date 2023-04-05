import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import agent from '~/api/agent'
import { DRAW_CHALLANGES_CATEGORY_SUFFIX } from './config'

const AddNewCategoryModal = ({ open, onClose, drawConfigs, setDrawConfigs }) => {
  const [categoryNameInput, setCategoryNameInput] = useState('')
  const { tab } = useParams()

  const updateDrawConfigsError = (error) => {
    console.log(error)
  }

  const updateDrawConfigsSuccess = (response) => {
    setDrawConfigs({ ...response.data })
    setCategoryNameInput('')
    onClose()
  }

  const updateDrawConfigs = (body) =>
    agent.Draws.updateDrawConfigs('guild_id', body).then(
      updateDrawConfigsSuccess,
      updateDrawConfigsError,
    )

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New category</DialogTitle>
      <DialogContent>
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
            if (!copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`]) {
              copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`] = {}
            }

            copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`][categoryNameInput] = []
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
