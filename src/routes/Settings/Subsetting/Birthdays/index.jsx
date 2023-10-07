import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import PageSpinner from '~/components/PageSpinner'
import BasicSettings from './BasicSettings'
import WishesSettings from './WishesSettings'

const Birthdays = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [birthdaysConfig, setBirthdaysConfig] = useState({})
  const [loading, setLoading] = useState(true)

  const updateBirthdaysConfigError = (error) => {
    console.log(error)
  }

  const updateBirthdaysConfigSuccess = (response) => {
    setBirthdaysConfig(response.data)
  }

  const updateBirthdaysConfig = (values) => {
    setLoading(true)

    agent.Birthdays.updateBirthdayConfig(selectedGuild.id, values)
      .then(updateBirthdaysConfigSuccess, updateBirthdaysConfigError)
      .finally(() => setLoading(false))
  }

  const getBirthdaysConfigError = (error) => {
    console.log(error)
  }

  const getBirthdaysConfigSuccess = (response) => {
    setBirthdaysConfig(response.data)
  }

  const getBirthdaysConfig = () => {
    setLoading(true)

    return agent.Birthdays.getBirthdaysConfig(selectedGuild.id)
      .then(getBirthdaysConfigSuccess, getBirthdaysConfigError)
      .then(() => setLoading(false))
  }

  useEffect(() => {
    getBirthdaysConfig()
  }, [])

  if (loading) return <PageSpinner />

  return (
    <Grid container spacing={2}>
      <BasicSettings
        birthdaysConfig={birthdaysConfig}
        updateBirthdaysConfig={updateBirthdaysConfig}
      />
      <WishesSettings />
    </Grid>
  )
}

export default Birthdays
