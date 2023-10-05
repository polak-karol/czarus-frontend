import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import PageSpinner from '~/components/PageSpinner'
import BasicSettings from './BasicSettings'

const Answers = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [answersSettings, setAnswersSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const updateAnswersChannelError = (error) => {
    console.log(error)
  }

  const updateAnswersChannelSuccess = (response) => {
    setAnswersSettings(response.data)
  }

  const updateAnswersChannel = (values) => {
    setLoading(true)

    return agent.GuildSettings.updateSettings(selectedGuild.id, values)
      .then(updateAnswersChannelSuccess, updateAnswersChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    setAnswersSettings(response.data)
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
        answersSettings={answersSettings}
        updateAnswersChannel={updateAnswersChannel}
      />
    </Grid>
  )
}

export default Answers
