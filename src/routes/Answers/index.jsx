import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import agent from '../../api/agent'
import AnswersList from './AnswersList'

const Answers = () => {
  const [answers, setAnswers] = useState([])
  const [filteredAnswers, setFilteredAnswers] = useState([])
  const [loading, setLoading] = useState(true)

  const getAnswersError = (error) => {
    console.log(error)
  }

  const getAnswersSuccess = (response) => {
    console.log(response)
    setAnswers(response.data)
    setFilteredAnswers(Object.entries(response.data).filter(([key]) => key.endsWith('Answers')))
  }

  const getAnswers = () => {
    setLoading(true)
    agent.Answers.getAnswers('guild_id')
      .then(getAnswersSuccess, getAnswersError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAnswers()
  }, [])

  if (loading) return

  return (
    <div>
      <Typography variant="h3" component="h3">
        Answers
      </Typography>
      <Grid container spacing={2}>
        {filteredAnswers.map(([key, value]) => (
          <AnswersList
            key={key}
            title={key}
            answers={value}
            baseAnswers={answers}
            setFilteredAnswers={setFilteredAnswers}
          />
        ))}
      </Grid>
    </div>
  )
}

export default Answers
