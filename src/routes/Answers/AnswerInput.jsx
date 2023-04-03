import React from 'react'
import { ListItemText, TextField } from '@mui/material'

const AnswerInput = ({
  selectedAnswerType,
  answerType,
  selectedAnswerIndex,
  index,
  answers,
  selectedAnswerInput,
  setSelectedAnswerInput,
}) =>
  selectedAnswerType === answerType && selectedAnswerIndex === index ? (
    <TextField
      required
      variant="standard"
      value={selectedAnswerInput}
      onChange={(event) => setSelectedAnswerInput(event.target.value)}
    />
  ) : (
    <ListItemText primary={answers[index]} />
  )

export default AnswerInput
