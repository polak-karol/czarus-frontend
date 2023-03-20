import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material'
import SecondaryActionDefault from './SecondaryActionDefault'
import SecondaryActionEdit from './SecondaryActionEdit'

const AnswersList = ({ title, answers, setFilteredAnswers, baseAnswers }) => {
  const [selectedAnswerType, setSelectedAnswerType] = useState('')
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState('')
  const [selectedAnswerInput, setSelectedAnswerInput] = useState('')
  const [itemActionsAllowed, setItemActionsAllowed] = useState(false)

  useEffect(() => {
    if (JSON.stringify(Object.fromEntries(answers)[title]) !== JSON.stringify(baseAnswers[title])) {
      setItemActionsAllowed(true)
    } else {
      setItemActionsAllowed(false)
    }
  }, [JSON.stringify(Object.fromEntries(answers)[title])])

  return (
    <Grid item xs={6}>
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <List>
            {answers?.map((answer, index) => (
              <ListItem
                key={answer}
                secondaryAction={
                  selectedAnswerType === title && selectedAnswerIndex === index ? (
                    <SecondaryActionEdit
                      saveAction={() => {
                        setFilteredAnswers((state) =>
                          state.map(([key, value]) => {
                            if (key !== title) return [key, value]

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
                        setSelectedAnswerType('')
                        setSelectedAnswerIndex('')
                        setSelectedAnswerInput('')
                      }}
                    />
                  ) : (
                    <SecondaryActionDefault
                      editAction={() => {
                        setSelectedAnswerType(title)
                        setSelectedAnswerIndex(index)
                        setSelectedAnswerInput(answer)
                      }}
                      deleteAction={() =>
                        setFilteredAnswers((state) =>
                          state.map(([key, value]) => {
                            if (key !== title) return [key, value]

                            value.splice(index, 1)
                            return [key, value]
                          }),
                        )
                      }
                    />
                  )
                }
              >
                {selectedAnswerType === title && selectedAnswerIndex === index ? (
                  <TextField
                    required
                    value={selectedAnswerInput}
                    onChange={(event) => setSelectedAnswerInput(event.target.value)}
                    variant="standard"
                  />
                ) : (
                  <ListItemText primary={answer} />
                )}
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Button disabled={itemActionsAllowed}>Cancel</Button>
          <Button color="secondary" disabled={itemActionsAllowed}>
            Save
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default AnswersList
