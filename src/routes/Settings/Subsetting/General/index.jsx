import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import BasicSettings from './BasicSettings'

const General = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [loading, setLoading] = useState(true)
  const [guildSettings, setGuildSettings] = useState({})
  const { enqueueSnackbar } = useSnackbar()

  const updateGuildSettingsError = (error) => {
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const updateGuildSettingsSuccess = (response) => {
    setGuildSettings(response.data)
  }

  const updateGuildSettings = (values) =>
    agent.GuildSettings.updateSettings(selectedGuild.id, values).then(
      updateGuildSettingsSuccess,
      updateGuildSettingsError,
    )

  const getGuildSettingsError = (error) => {
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const getGuildSettingsSuccess = (response) => {
    setGuildSettings(response.data)
  }

  const getGuildSettings = () => {
    setLoading(true)

    return agent.GuildSettings.getSettings(selectedGuild.id)
      .then(getGuildSettingsSuccess, getGuildSettingsError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getGuildSettings()
  }, [])

  if (loading) return

  return (
    <Grid container spacing={2}>
      <BasicSettings guildSettings={guildSettings} updateGuildSettings={updateGuildSettings} />
    </Grid>
  )
}

export default General
