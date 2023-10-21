import { Grid } from '@mui/material'
import React from 'react'
import Page from '~/components/Page'
import ToDoList from './ToDoList'

const Dashboard = () => (
  <Page title="Dashboard">
    <Grid container>
      <ToDoList />
    </Grid>
  </Page>
)

export default Dashboard
