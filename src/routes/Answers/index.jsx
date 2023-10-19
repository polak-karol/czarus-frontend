import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { Grid, IconButton } from '@mui/material'
import { SettingsRounded } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import Page from '~/components/Page'
import AnswersList from './AnswersList'
import { ANSWERS_CATEGORY_SUFFIX, defaultAnswersValue } from './config'
import { filterAnswers } from './utils'

const Answers = () => {
  const navigate = useNavigate()
  const { selectedGuild } = useContext(SelectedGuildContext)
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState(defaultAnswersValue)
  const [filteredAnswers, setFilteredAnswers] = useState(filterAnswers(defaultAnswersValue))

  const getAnswersError = (error) => {
    if (error.response.status === 404) {
      setFilteredAnswers(
        Object.entries({ ...answers }).filter(([key]) => key.endsWith(ANSWERS_CATEGORY_SUFFIX)),
      )
      return
    }
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const getAnswersSuccess = (response) => {
    if (_.isEmpty(response)) return

    setAnswers({ ...response.data })
    return setFilteredAnswers(filteredAnswers(response.data))
  }

  const getAnswers = () => {
    setLoading(true)
    agent.Answers.getAnswers(selectedGuild.id)
      .then(getAnswersSuccess, getAnswersError)
      .finally(() => setLoading(false))
  }

  const updateAnswersError = (error) => {
    enqueueSnackbar(error.response.data.msg, ERROR_SNACKBAR_CONFIG)
  }

  const updateAnswersSuccess = (response) => {
    setAnswers({ ...response.data })
  }

  const updateAnswers = (data) => {
    agent.Answers.updateAnswers(selectedGuild.id, data).then(
      updateAnswersSuccess,
      updateAnswersError,
    )
  }

  useEffect(() => {
    getAnswers()
  }, [])

  if (loading) return

  return (
    <Page
      title="Answers"
      actions={
        <IconButton onClick={() => navigate('/settings/answers')}>
          <SettingsRounded />
        </IconButton>
      }
    >
      <Grid container gap={2}>
        {filteredAnswers
          .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
          .map(([key, value]) => (
            <AnswersList
              key={key}
              answerType={key}
              answers={value}
              baseAnswers={answers}
              setFilteredAnswers={setFilteredAnswers}
              updateAnswers={updateAnswers}
            />
          ))}
      </Grid>
    </Page>
  )
}

export default Answers
