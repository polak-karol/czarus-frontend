import React from 'react'
import { Grid, Typography } from '@mui/material'
import AnswersList from './AnswersList'

const Answers = () => (
  <div>
    <Typography variant="h3" component="h3">
      Answers
    </Typography>
    <Grid container spacing={2}>
      <AnswersList />
      <AnswersList />
      <AnswersList />
      <AnswersList />
      <AnswersList />
      <AnswersList />
    </Grid>
  </div>
)

export default Answers
