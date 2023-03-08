import React from 'react'
import { Stack, Typography } from '@mui/material'
import BirthdaysTable from './BirthdayTable'

const Birthdays = () => (
  <Stack spacing={4}>
    <Typography variant="h2" component="h2">
      Birthdays
    </Typography>
    <BirthdaysTable />
  </Stack>
)

export default Birthdays
