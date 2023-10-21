import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { toDo } from './config'

const ToDoList = () => {
  const navigate = useNavigate()

  return (
    <Grid item xs={5}>
      <Card>
        <CardContent>
          <Typography component="h2" variant="h6">
            To do
          </Typography>
          <List sx={{ width: '100%' }} aria-label="contacts">
            {toDo.map((item) => (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate(item.url)}>
                  <ListItemText inset primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default ToDoList
