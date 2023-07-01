import React from 'react'
import { Container, Stack, Typography } from '@mui/material'

const Page = ({ title, children, actions }) => (
  <Container fixed>
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        {actions}
      </Stack>
      {children}
    </Stack>
  </Container>
)

export default Page
