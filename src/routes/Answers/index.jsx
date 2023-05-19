import React, { useEffect, useState, useContext } from 'react'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import AnswersList from './AnswersList'
import Page from '~/components/Page'

const Answers = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [answers, setAnswers] = useState([])
  const [filteredAnswers, setFilteredAnswers] = useState([])
  const [loading, setLoading] = useState(true)

  const getAnswersError = (error) => {
    console.log(error)
  }

  const getAnswersSuccess = (response) => {
    setAnswers({ ...response.data })
    setFilteredAnswers(
      Object.entries({ ...response.data })
        .filter(([key]) => key.endsWith('Answers'))
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
    console.log(error)
  }

  const updateAnswersSuccess = (response) => {
    console.log(response)
    setAnswers({ ...response.data })
  }

  const updateAnswers = (data) => {
    const body = { ...data, channelId: 'channel_id' }
    agent.Answers.updateAnswers(selectedGuild.id, body).then(
      updateAnswersSuccess,
      updateAnswersError,
    )
  }

  useEffect(() => {
    getAnswers()
  }, [])

  if (loading) return

  return (
    <Page title="Answers">
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
