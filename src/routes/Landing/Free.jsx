import React from 'react'
import MoneyOffRoundedIcon from '@mui/icons-material/MoneyOffRounded'
import { Stack, Typography } from '@mui/material'
import { FreeSection } from './styles'

const Free = () => (
  <FreeSection>
    <MoneyOffRoundedIcon sx={{ fontSize: '16rem', color: 'green' }} />
    <Stack gap="1.5rem" sx={{ height: 'fit-content', marginTop: '1rem' }}>
      <Typography component="h3" variant="h3">
        Free
      </Typography>
      <Typography component="p" variant="p">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ducimus atque provident
        enim in beatae nemo incidunt? Fuga, dolores voluptatibus praesentium molestias dolore vero!
        Quis doloribus rem et voluptatum modi?
      </Typography>
    </Stack>
  </FreeSection>
)

export default Free
