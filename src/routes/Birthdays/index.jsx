import React from 'react'
import { Card, CardContent, Stack, Typography } from '@mui/material'
import BirthdaysTable from './BirthdayTable'

const Birthdays = () => (
  <Stack spacing={4}>
    <Typography variant="h3" component="h3">
      Birthdays
    </Typography>
    <Card>
      <CardContent>
        <BirthdaysTable />
      </CardContent>
    </Card>
  </Stack>
)

export default Birthdays
