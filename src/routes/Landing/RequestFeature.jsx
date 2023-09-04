import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'
import { RequestFeatureSection } from './styles'

const RequestFeature = () => (
  <RequestFeatureSection>
    <Stack gap="1.5rem" alignItems="flex-start" sx={{ height: 'fit-content', marginTop: '1rem' }}>
      <Typography component="h3" variant="h3">
        Request feature
      </Typography>
      <Typography component="p" variant="p">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, repellendus accusamus
        excepturi magni voluptates libero a, reiciendis sapiente culpa impedit nisi veniam nemo
        voluptate nulla fuga, numquam voluptas inventore perferendis!
      </Typography>
      <Button>Request</Button>
    </Stack>
    <TipsAndUpdatesRoundedIcon sx={{ fontSize: '14rem', color: 'yellow' }} />
  </RequestFeatureSection>
)

export default RequestFeature
