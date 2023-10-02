import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import ChannelSelector from '~/components/ChannelSelector'

const Answers = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [selectedChannel, setSelectedChannel] = useState('')
  const [loading, setLoading] = useState(true)

  const updateAnswersChannelError = (error) => {
    console.log(error)
  }

  const updateAnswersChannelSuccess = (response) => {
    console.log(response)
  }

  const updateAnswersChannel = () => {
    setLoading(true)
    const body = { answersChannelId: selectedChannel }

    agent.GuildSettings.updateSettings(selectedGuild.id, body)
      .then(updateAnswersChannelSuccess, updateAnswersChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    console.log(response)
    setSelectedChannel(response.data.answersChannelId)
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
              setSelectedChannel={(event) => setSelectedChannel(event.target.value)}
              helperText="Ipsam facere beatae nam tempore voluptas illum facilis."
            />
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => updateAnswersChannel()}>
              Save
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Answers
