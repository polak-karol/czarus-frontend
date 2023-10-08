import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import PageSpinner from '~/components/PageSpinner'
import BasicSettings from './BasicSettings'

const Holidays = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [holidaysSettings, setHolidaysSettings] = useState('')
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  const updateHolidaysChannelError = (error) => {
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const updateHolidaysChannelSuccess = (response) => {
    setHolidaysSettings(response.data)
  }

  const updateHolidaysChannel = (values) => {
    setLoading(true)

    agent.GuildSettings.updateSettings(selectedGuild.id, values)
      .then(updateHolidaysChannelSuccess, updateHolidaysChannelError)
      .finally(() => setLoading(false))
  }

  const getHolidaysConfigError = (error) => {
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const getHolidaysConfigSuccess = (response) => {
    setHolidaysSettings(response.data)
  }

  const getHolidaysConfig = () => {
    setLoading(true)

    return agent.Holidays.getHolidayConfig(selectedGuild.id)
      .then(getHolidaysConfigSuccess, getHolidaysConfigError)
      .then(() => setLoading(false))
  }

  useEffect(() => {
    getHolidaysConfig()
  }, [])

  if (loading) return <PageSpinner />

  return (
    <Grid container spacing={2}>
      <BasicSettings
        holidaysSettings={holidaysSettings}
        updateHolidaysChannel={updateHolidaysChannel}
      />
    </Grid>
  )
}

export default Holidays
