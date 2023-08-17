import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
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
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import {
  convertCategoryNameToDiscordCommandParam,
  getDrawConfigsWithChangedSubItemName,
} from './utils'

const EditCategoryModal = ({
  open,
  onClose,
  setDrawConfigs,
  drawConfigs,
  editCategoryNameInput,
  setEditCategoryNameInput,
  drawConfigItemKey,
}) => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const { enqueueSnackbar } = useSnackbar()
  const { tab } = useParams()

  const updateDrawConfigsError = (error) => {
    enqueueSnackbar(error.response.data.msg, ERROR_SNACKBAR_CONFIG)
  }

  const updateDrawConfigsSuccess = (response) => {
    setDrawConfigs({ ...response.data })
    onClose()
  }

  const updateDrawConfigs = (body) =>
    agent.Draws.updateDrawConfigs(selectedGuild.id, body).then(
      updateDrawConfigsSuccess,
      updateDrawConfigsError,
    )

  return (
    <Dialog maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Edit category</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText>Change a name of selected category.</DialogContentText>
          <TextField
            fullWidth
            label="Category name"
            variant="standard"
            value={editCategoryNameInput}
            onChange={(event) => setEditCategoryNameInput(event.target.value)}
          />
          <TextField
            disabled
            aria-readonly
            fullWidth
            label="Command parameter"
            variant="standard"
            defaultValue={convertCategoryNameToDiscordCommandParam(editCategoryNameInput)}
            value={convertCategoryNameToDiscordCommandParam(editCategoryNameInput)}
          />
        </Stack>
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
