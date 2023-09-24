import React from 'react'
import { Container, Paper, Stack } from '@mui/material'
import RightSide from './RightSide'

const Footer = () => (
  <Paper sx={{ marginTop: '6rem' }}>
    <Container sx={{ padding: '2rem 0' }} fixed>
      <Stack flexDirection="row" justifyContent="center">
        <RightSide />
      </Stack>
    </Container>
  </Paper>
)

export default Footer
