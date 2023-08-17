import React from 'react'
import { IconButton, Stack } from '@mui/material'
import { CancelRounded, SaveRounded } from '@mui/icons-material'

const SecondaryActionEdit = ({ disabledSaveAction, saveAction, cancelAction }) => (
  <Stack direction="row" spacing={2}>
    <IconButton disabled={disabledSaveAction} onClick={saveAction} color="primary" edge="end">
      <SaveRounded />
    </IconButton>
    <IconButton onClick={cancelAction} color="error" edge="end">
      <CancelRounded />
    </IconButton>
  </Stack>
)

export default SecondaryActionEdit
