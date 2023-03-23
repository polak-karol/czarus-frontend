import React from 'react'
import { DeleteRounded, EditRounded } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'

const SecondaryActionDefault = ({ editAction, deleteAction }) => (
  <Stack direction="row" spacing={2}>
    <IconButton onClick={editAction} color="primary" edge="end" aria-label="edit">
      <EditRounded />
    </IconButton>
    <IconButton onClick={deleteAction} color="error" edge="end" aria-label="delete">
      <DeleteRounded />
    </IconButton>
  </Stack>
)

export default SecondaryActionDefault
