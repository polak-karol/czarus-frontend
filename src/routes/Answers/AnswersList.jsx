import React from 'react'
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

const AnswersList = () => (
  <Grid item xs={6}>
    <Card>
      <CardHeader title="What" />
      <CardContent>
        <List>
          <ListItem
            secondaryAction={
              <Stack direction="row" spacing={2}>
                <IconButton color="primary" edge="end" aria-label="edit">
                  <Edit />
                </IconButton>
                <IconButton color="error" edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              </Stack>
            }
          >
            <ListItemText primary="Single-line item" />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button>Cancel</Button>
        <Button color="secondary">Save</Button>
      </CardActions>
    </Card>
  </Grid>
)

export default AnswersList
