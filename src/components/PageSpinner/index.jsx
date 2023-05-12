import React from 'react'
import { CircularProgress, Stack } from '@mui/material'

const PageSpinner = () => (
  <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
    <CircularProgress />
  </Stack>
)

export default PageSpinner
