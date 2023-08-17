import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import { convertCategoryNameToDiscordCommandParam, getBodyForAddCategoryAction } from './utils'

const AddNewCategoryModal = ({ open, onClose, drawConfigs, setDrawConfigs }) => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const { enqueueSnackbar } = useSnackbar()
  const [categoryNameInput, setCategoryNameInput] = useState('')
  const { tab } = useParams()

  const updateDrawConfigsError = (error) => {
    enqueueSnackbar(error.response.data.msg, ERROR_SNACKBAR_CONFIG)
  }

  const updateDrawConfigsSuccess = (response) => {
    setDrawConfigs({ ...response.data })
    setCategoryNameInput('')
    onClose()
  }

  const updateDrawConfigs = (body) =>
    agent.Draws.updateDrawConfigs(selectedGuild.id, body).then(
      updateDrawConfigsSuccess,
      updateDrawConfigsError,
    )

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New category</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Category name"
            variant="standard"
            value={categoryNameInput}
            onChange={(event) => setCategoryNameInput(event.target.value)}
          />
          <TextField
            disabled
            aria-readonly
            fullWidth
            label="Category name in command param"
            variant="standard"
            defaultValue={convertCategoryNameToDiscordCommandParam(categoryNameInput)}
            value={convertCategoryNameToDiscordCommandParam(categoryNameInput)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="secondary"
          disabled={!categoryNameInput}
          onClick={() =>
            updateDrawConfigs(getBodyForAddCategoryAction(drawConfigs, tab, categoryNameInput))
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddNewCategoryModal
