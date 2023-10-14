import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, IconButton } from '@mui/material'
import { SettingsRounded } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import Page from '~/components/Page'
import AnswersList from './AnswersList'
import { ANSWERS_CATEGORY_SUFFIX } from './config'

const Answers = () => {
  const navigate = useNavigate()
  const { selectedGuild } = useContext(SelectedGuildContext)
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState({
    doesAnswers: [],
    howAnswers: [],
    whatAnswers: [],
    whatDoYouThinkAnswers: [],
    whatIsAnswers: [],
    whenAnswers: [],
    whoAnswers: [],
    whyAnswers: [],
  })
  const [filteredAnswers, setFilteredAnswers] = useState([])

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
    setAnswers({ ...response.data })
    setFilteredAnswers(
      Object.entries({ ...response.data })
        .filter(([key]) => key.endsWith(ANSWERS_CATEGORY_SUFFIX))
        .map(([key, value]) => {
          if (!value) return [key, value]

          return [key, [...value]]
        }),
    )
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
