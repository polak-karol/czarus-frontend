import React from 'react'
import { ListItem } from '@mui/material'
import AnswerInput from './AnswerInput'
import SecondaryActionDefault from './SecondaryActionDefault'
import SecondaryActionEdit from './SecondaryActionEdit'

const AnswerItem = ({
  index,
  style,
  data: {
    answers,
    selectedAnswerType,
    answerType,
    selectedAnswerIndex,
    selectedAnswerInput,
    setFilteredAnswers,
    setSelectedAnswerType,
    setSelectedAnswerIndex,
    setSelectedAnswerInput,
  },
}) => (
  <ListItem
    style={style}
    key={answers[index]}
    secondaryAction={
      selectedAnswerType === answerType && selectedAnswerIndex === index ? (
        <SecondaryActionEdit
          disabledSaveAction={!selectedAnswerInput}
          saveAction={() => {
            setFilteredAnswers((state) =>
              state.map(([key, value]) => {
                if (key !== answerType) return [key, value]

                return [
                  key,
                  value.map((item, itemIndex) => {
                    if (itemIndex !== index) return item

                    return selectedAnswerInput
                  }),
                ]
              }),
            )
            setSelectedAnswerType('')
            setSelectedAnswerIndex('')
            setSelectedAnswerInput('')
          }}
          cancelAction={() => {
            setFilteredAnswers((state) =>
              state.map(([key, value]) => {
                if (key !== answerType) return [key, value]

                return [key, value.filter((item) => item !== '')]
              }),
            )
            setSelectedAnswerType('')
            setSelectedAnswerIndex('')
            setSelectedAnswerInput('')
          }}
        />
      ) : (
        <SecondaryActionDefault
          editAction={() => {
            setSelectedAnswerType(answerType)
            setSelectedAnswerIndex(index)
            setSelectedAnswerInput(answers[index])
          }}
          deleteAction={() =>
            setFilteredAnswers((state) =>
              [...state].map(([key, value]) => {
                if (key !== answerType) return [key, value]

                value.splice(index, 1)
                return [key, value]
              }),
            )
          }
        />
      )
    }
  >
    <AnswerInput
      index={index}
      answers={answers}
      answerType={answerType}
      selectedAnswerType={selectedAnswerType}
      selectedAnswerIndex={selectedAnswerIndex}
      selectedAnswerInput={selectedAnswerInput}
      setSelectedAnswerInput={setSelectedAnswerInput}
    />
  </ListItem>
)

export default AnswerItem
