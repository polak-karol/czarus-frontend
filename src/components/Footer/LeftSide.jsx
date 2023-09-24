import React from 'react'
import { Link, Stack } from '@mui/material'

const LeftSide = () => (
  <Stack sx={{ padding: '3rem 0' }} flexDirection="row" gap={3}>
    <Link href="#">Privacy Policy</Link>
    <Link href="#">Terms</Link>
    <Link href="#">Author</Link>
    <Link href="#">Contact</Link>
    <Link href="#">Discord</Link>
  </Stack>
)

export default LeftSide
