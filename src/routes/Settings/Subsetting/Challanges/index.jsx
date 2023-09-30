import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import ChannelSelector from '~/components/ChannelSelector'

const Challanges = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [selectedChannel, setSelectedChannel] = useState('')
  const [loading, setLoading] = useState(true)

  const updateChallangesChannelError = (error) => {
    console.log(error)
  }

  const updateChallangesChannelSuccess = (response) => {
    setSelectedChannel(response.data.drawChallangesChannelId)
  }

  const updateChallangesChannel = (channel) => {
    setLoading(true)
    const body = { drawChallangesChannelId: channel }

    agent.GuildSettings.updateSettings(selectedGuild.id, body)
      .then(updateChallangesChannelSuccess, updateChallangesChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    console.log(response)
    setSelectedChannel(response.data.drawChallangesChannelId)
  }

  const getGuildSettings = () => {
    setLoading(true)

    return agent.GuildSettings.getSettings(selectedGuild.id)
      .then(getGuildSettingsSuccess, getGuildSettingsError)
      .then(() => setLoading(false))
  }

  useEffect(() => {
    getGuildSettings()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Stack>
          <Typography component="h6" variant="h6">
            Basic settings
          </Typography>
          <Typography component="p" variant="p">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.{' '}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={7}>
        <Card>
          <CardContent>
            <Stack>
              <ChannelSelector
                fullWidth
                disabled={loading}
                selectedChannel={selectedChannel}
                setSelectedChannel={(event) => updateChallangesChannel(event.target.value)}
                helperText="Ipsam facere beatae nam tempore voluptas illum facilis."
              />
              <ChannelSelector
                fullWidth
                disabled={loading}
                selectedChannel={selectedChannel}
                setSelectedChannel={(event) => updateChallangesChannel(event.target.value)}
                helperText="Ipsam facere beatae nam tempore voluptas illum facilis."
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Challanges
