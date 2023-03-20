import React, { useState } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material'

const AnswersList = ({ title, answers, setFilteredAnswers }) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState()

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
                  <Stack direction="row" spacing={2}>
                    <IconButton color="primary" edge="end" aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        setFilteredAnswers((state) =>
                          state.map(([key, value]) => {
                            if (key !== title) return [key, value]

                            value.splice(index, 1)
                            return [key, value]
                          }),
                        )
                      }
                      color="error"
                      edge="end"
                      aria-label="delete"
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText primary={answer} />
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
