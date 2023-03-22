import React from 'react'
import { CancelRounded, SaveRounded } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'

const SecondaryActionEdit = ({ saveAction, cancelAction, disabledSaveAction }) => (
  <Stack direction="row" spacing={2}>
    <IconButton
      disabled={disabledSaveAction}
      onClick={saveAction}
      color="primary"
      edge="end"
      aria-label="edit"
    >
      <SaveRounded />
    </IconButton>
    <IconButton onClick={cancelAction} color="error" edge="end" aria-label="delete">
      <CancelRounded />
    </IconButton>
  </Stack>
)

export default SecondaryActionEdit
