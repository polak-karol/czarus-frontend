import React from 'react'
import { AddCircleRounded } from '@mui/icons-material'
import { Button, ButtonGroup, IconButton, Stack } from '@mui/material'

const CardActions = ({
  addAction,
  cancelAction,
  saveAction,
  disabledSaveActions,
  disabledAddAction,
}) => (
  <Stack style={{ flex: 1 }} justifyContent="space-between" direction="row" alignItems="center">
    <IconButton
      disabled={disabledAddAction}
      onClick={addAction}
      color="primary"
      edge="end"
      aria-label="edit"
    >
      <AddCircleRounded fontSize="large" />
    </IconButton>
    <ButtonGroup>
      <Button onClick={cancelAction} disabled={disabledSaveActions}>
        Cancel
      </Button>
      <Button onClick={saveAction} color="secondary" disabled={disabledSaveActions}>
        Save
      </Button>
    </ButtonGroup>
  </Stack>
)

export default CardActions
