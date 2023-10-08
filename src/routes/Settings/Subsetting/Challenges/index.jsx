import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import PageSpinner from '~/components/PageSpinner'
import BasicSettings from './BasicSettings'

const Challenges = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [drawConfig, setDrawConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  const updateDrawConfigError = (error) => {
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const updateDrawConfigSuccess = (response) => {
    setDrawConfig(response.data)
  }

  const updateDrawConfig = (values) => {
    setLoading(true)

    return agent.Draws.updateDrawConfigs(selectedGuild.id, values)
      .then(updateDrawConfigSuccess, updateDrawConfigError)
      .finally(() => setLoading(false))
  }

  const getDrawConfigError = (error) => {
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const getDrawConfigSuccess = (response) => {
    setDrawConfig(response.data)
  }

  const getDrawConfig = () => {
    setLoading(true)

    return agent.Draws.getDrawConfigs(selectedGuild.id)
      .then(getDrawConfigSuccess, getDrawConfigError)
      .then(() => setLoading(false))
  }

  useEffect(() => {
    getDrawConfig()
  }, [])

  if (loading) return <PageSpinner />

  return (
    <Grid container spacing={2}>
      <BasicSettings drawConfig={drawConfig} updateDrawConfig={updateDrawConfig} />
    </Grid>
  )
}

export default Challenges
