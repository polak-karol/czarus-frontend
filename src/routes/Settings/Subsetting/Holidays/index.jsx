import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import PageSpinner from '~/components/PageSpinner'
import BasicSettings from './BasicSettings'

const Holidays = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [holidaysSettings, setHolidaysSettings] = useState('')
  const [loading, setLoading] = useState(true)

  const updateHolidaysChannelError = (error) => {
    console.log(error)
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

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    setHolidaysSettings(response.data)
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
        holidaysSettings={holidaysSettings}
        updateHolidaysChannel={updateHolidaysChannel}
      />
    </Grid>
  )
}

export default Holidays
