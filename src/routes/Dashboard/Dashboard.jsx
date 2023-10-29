import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import agent from '~/api/agent'
import Page from '~/components/Page'
import ToDoList from './ToDoList'
import AnswersCounter from './AnswersCounter'

const Dashboard = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [dashboardData, setDashboardData] = useState({})
  const [pageLoading, setPageLoading] = useState(true)

  const getDashboardDataError = (error) => {
    console.log(error)
  }

  const getDashboardDataSuccess = (response) => {
    setDashboardData(response.data)
  }

  const getDashboardData = () => {
    setPageLoading(true)

    return agent.Dashboard.getDashboardData(selectedGuild.id)
      .then(getDashboardDataSuccess, getDashboardDataError)
      .finally(() => setPageLoading(false))
  }
  useEffect(() => {
    getDashboardData()
  }, [])

  if (pageLoading) return

  return (
    <Page title="Dashboard">
      <Grid container gap={2}>
        <ToDoList dashboardData={dashboardData} />
        <AnswersCounter dashboardData={dashboardData} />
      </Grid>
    </Page>
  )
}

export default Dashboard
