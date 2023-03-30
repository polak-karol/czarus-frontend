import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Grid, IconButton, Stack } from '@mui/material'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import CardScrollList from '~/components/CardScrollList'
import { answersTitle } from './config'
import AnswerItem from './AnswerItem'

const AnswersList = ({ answerType, answers, setFilteredAnswers, baseAnswers, updateAnswers }) => {
  const [selectedAnswerType, setSelectedAnswerType] = useState('')
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState('')
  const [selectedAnswerInput, setSelectedAnswerInput] = useState('')
  const [itemActionsAllowed, setItemActionsAllowed] = useState(false)

  useEffect(() => {
    if (
      JSON.stringify(answers?.sort((a, b) => a.localeCompare(b))) !==
      JSON.stringify(baseAnswers[answerType]?.sort((a, b) => a.localeCompare(b)))
    ) {
      setItemActionsAllowed(true)
    } else {
      setItemActionsAllowed(false)
    }
  }, [JSON.stringify(answers), JSON.stringify(baseAnswers[answerType])])

  return (
    <Grid item xs={6}>
      <CardScrollList
        title={answersTitle[answerType]}
        listConfig={{
          itemData: {
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
          height: 300,
          itemSize: 46,
          itemCount: answers?.length || 0,
          overscanCount: 5,
        }}
        Item={AnswerItem}
        Actions={
          <Stack style={{ flex: 1 }} justifyContent="space-between" direction="row">
            <IconButton
              disabled={!!selectedAnswerType}
              onClick={() => {
                setFilteredAnswers((state) =>
                  state.map(([key, value]) => {
                    if (key !== answerType) return [key, value]

                    value.unshift('')

                    return [key, value]
                  }),
                )
                setSelectedAnswerType(answerType)
                setSelectedAnswerIndex(0)
                setSelectedAnswerInput(answers.at(0))
              }}
              color="primary"
              edge="end"
              aria-label="edit"
            >
              <AddCircleRoundedIcon fontSize="large" />
            </IconButton>
            <ButtonGroup>
              <Button
                onClick={() => {
                  setFilteredAnswers((state) =>
                    state.map(([key, value]) => {
                      if (key !== answerType) return [key, value]

                      return [key, baseAnswers[answerType] ? [...baseAnswers[answerType]] : null]
                    }),
                  )
                }}
                disabled={!itemActionsAllowed || !!selectedAnswerType}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  updateAnswers(Object.fromEntries([[answerType, answers]]))
                }}
                color="secondary"
                disabled={!itemActionsAllowed || !!selectedAnswerType}
              >
                Save
              </Button>
            </ButtonGroup>
          </Stack>
        }
      />
    </Grid>
  )
}

export default AnswersList
