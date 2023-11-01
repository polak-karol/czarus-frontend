import React from 'react'
import MoneyOffRoundedIcon from '@mui/icons-material/MoneyOffRounded'
import { Stack, Typography } from '@mui/material'
import { FreeSection } from './styles'

const Free = () => (
  <FreeSection>
    <MoneyOffRoundedIcon sx={{ fontSize: '16rem', color: 'green' }} />
    <Stack gap="1.5rem" sx={{ height: 'fit-content', marginTop: '1rem' }}>
      <Typography component="h3" variant="h3">
        Absolutely free
      </Typography>
      <Typography component="p" variant="p">
        The best part? Czaruś is completely free to use! You can enjoy all these amazing features
        without any cost or subscriptions.
      </Typography>
    </Stack>
  </FreeSection>
)

export default Free
