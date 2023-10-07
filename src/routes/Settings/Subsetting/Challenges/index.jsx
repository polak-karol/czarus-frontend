import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import PageSpinner from '~/components/PageSpinner'
import BasicSettings from './BasicSettings'

const Challenges = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [drawConfig, setDrawConfig] = useState({})
  const [loading, setLoading] = useState(true)

  const updateDrawConfigError = (error) => {
    console.log(error)
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
    console.log(error)
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
