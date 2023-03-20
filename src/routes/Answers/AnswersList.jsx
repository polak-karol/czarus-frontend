import React, { useState } from 'react'
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

const AnswersList = ({ title, answers, setFilteredAnswers }) => {
  const [selectedAnswerType, setSelectedAnswerType] = useState('')
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState('')
  const [selectedAnswerInput, setSelectedAnswerInput] = useState('')

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
                      saveAction={() => {}}
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
          <Button>Cancel</Button>
          <Button color="secondary">Save</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default AnswersList
