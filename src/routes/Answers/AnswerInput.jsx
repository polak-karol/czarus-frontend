import { ListItemText, TextField } from '@mui/material'
import React from 'react'

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
      value={selectedAnswerInput}
      onChange={(event) => {
        setSelectedAnswerInput(event.target.value)
      }}
      variant="standard"
    />
  ) : (
    <ListItemText primary={answers[index]} />
  )

export default AnswerInput
