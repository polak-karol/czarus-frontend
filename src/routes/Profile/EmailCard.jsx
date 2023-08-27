import React, { useContext } from 'react'
import { Card, Typography } from '@mui/material'
import UserContext from '~/contexts/UserContext'

const EmailCard = () => {
  const { user } = useContext(UserContext)

  return (
    <Card sx={{ flex: 1, padding: '2rem' }}>
      <Typography component="h6" variant="h6">
        Email
      </Typography>
      <Typography component="span" variant="body1">
        {user.email}
      </Typography>
    </Card>
  )
}

export default EmailCard
