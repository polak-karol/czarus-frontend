import React from 'react'
import { Container, Stack, Typography } from '@mui/material'

const Page = ({ title, children }) => (
  <Container fixed>
    <Stack spacing={4}>
      <Typography variant="h3" component="h3">
        {title}
      </Typography>
      {children}
    </Stack>
  </Container>
)

export default Page
