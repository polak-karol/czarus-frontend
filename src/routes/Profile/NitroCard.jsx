import React, { useContext } from 'react'
import { Card, Typography } from '@mui/material'
import UserContext from '~/contexts/UserContext'
import { nitroMap } from './config'

const NitroCard = () => {
  const { user } = useContext(UserContext)

  return (
    <Card sx={{ flex: 1, padding: '2rem' }}>
      <Typography component="h3" variant="h6">
        Nitro type
      </Typography>
      <Typography component="span" variant="body1">
        {nitroMap[user.premiumType]}
      </Typography>
    </Card>
  )
}

export default NitroCard
