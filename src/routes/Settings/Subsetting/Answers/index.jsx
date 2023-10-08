import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import PageSpinner from '~/components/PageSpinner'
import BasicSettings from './BasicSettings'

const Answers = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [answersConfig, setAnswersConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  const updateAnswersConfigError = (error) => {
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const updateAnswersConfigSuccess = (response) => {
    setAnswersConfig(response.data)
  }

  const updateAnswersConfig = (values) => {
    setLoading(true)

    return agent.Answers.updateAnswerConfig(selectedGuild.id, values)
      .then(updateAnswersConfigSuccess, updateAnswersConfigError)
      .finally(() => setLoading(false))
  }

  const getAnswerSettingsError = (error) => {
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const getAnswerSettingsSuccess = (response) => {
    setAnswersConfig(response.data)
  }

  const getAnswerSettings = () => {
    setLoading(true)

    return agent.Answers.getAnswerConfig(selectedGuild.id)
      .then(getAnswerSettingsSuccess, getAnswerSettingsError)
      .then(() => setLoading(false))
  }

  useEffect(() => {
    getAnswerSettings()
  }, [])

  if (loading) return <PageSpinner />

  return (
    <Grid container spacing={2}>
      <BasicSettings answersConfig={answersConfig} updateAnswersConfig={updateAnswersConfig} />
    </Grid>
  )
}

export default Answers
