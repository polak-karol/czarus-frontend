import React from 'react'
import { Avatar, Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SettingsItem = ({ Icon, title, content, url }) => {
  const navigate = useNavigate()

  return (
    <Grid item xs={4}>
      <Card>
        <CardActionArea onClick={() => navigate(url)}>
          <CardContent>
            <Stack gap="1rem" flexDirection="row">
              <Avatar sx={{ bgcolor: 'smoke', color: 'white' }} variant="rounded">
                <Icon />
              </Avatar>
              <Stack flexDirection="column">
                <Typography style={{ lineHeight: 'unset' }} component="h6" variant="h6">
                  {title}
                </Typography>
                <Typography component="p" variant="p">
                  {content}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default SettingsItem
