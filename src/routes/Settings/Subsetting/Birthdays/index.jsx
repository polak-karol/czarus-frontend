import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import PageSpinner from '~/components/PageSpinner'
import BasicSettings from './BasicSettings'

const Birthdays = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [birthdaysSettings, setBirthdaysSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const updateBirthdaysChannelError = (error) => {
    console.log(error)
  }

  const updateBirthdaysChannelSuccess = (response) => {
    setBirthdaysSettings(response.data)
  }

  const updateBirthdaysChannel = (values) => {
    setLoading(true)

    agent.GuildSettings.updateSettings(selectedGuild.id, values)
      .then(updateBirthdaysChannelSuccess, updateBirthdaysChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    setBirthdaysSettings(response.data)
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
        birthdaysSettings={birthdaysSettings}
        updateBirthdaysChannel={updateBirthdaysChannel}
      />
    </Grid>
  )
}

export default Birthdays
