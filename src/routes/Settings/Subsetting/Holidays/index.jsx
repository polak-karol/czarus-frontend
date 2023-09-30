import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import ChannelSelector from '~/components/ChannelSelector'

const Holidays = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [selectedChannel, setSelectedChannel] = useState('')
  const [loading, setLoading] = useState(true)

  const updateHolidaysChannelError = (error) => {
    console.log(error)
  }

  const updateHolidaysChannelSuccess = (response) => {
    setSelectedChannel(response.data.holidaysChannelId)
  }

  const updateHolidaysChannel = (channel) => {
    setLoading(true)
    const body = { holidaysChannelId: channel }

    agent.GuildSettings.updateSettings(selectedGuild.id, body)
      .then(updateHolidaysChannelSuccess, updateHolidaysChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    console.log(response)
    setSelectedChannel(response.data.holidaysChannelId)
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
            <ChannelSelector
              fullWidth
              disabled={loading}
              selectedChannel={selectedChannel}
              setSelectedChannel={(event) => updateHolidaysChannel(event.target.value)}
              helperText="Ipsam facere beatae nam tempore voluptas illum facilis."
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Holidays
