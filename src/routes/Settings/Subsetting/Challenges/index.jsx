import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import PageSpinner from '~/components/PageSpinner'
import BasicSettings from './BasicSettings'

const Challenges = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [challengesSettings, setChallengesSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const updateChallangesChannelError = (error) => {
    console.log(error)
  }

  const updateChallangesChannelSuccess = (response) => {
    setChallengesSettings(response.data)
  }

  const updateChallangesChannel = (values) => {
    setLoading(true)

    return agent.GuildSettings.updateSettings(selectedGuild.id, values)
      .then(updateChallangesChannelSuccess, updateChallangesChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    setChallengesSettings(response.data)
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

  if (loading) return <PageSpinner />

  return (
    <Grid container spacing={2}>
      <BasicSettings
        challengesSettings={challengesSettings}
        updateChallangesChannel={updateChallangesChannel}
      />
    </Grid>
  )
}

export default Challenges
