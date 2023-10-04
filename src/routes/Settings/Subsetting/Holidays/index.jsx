import React, { useContext, useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import ChannelSelector from '~/components/ChannelSelector'
import PageSpinner from '~/components/PageSpinner'

const Holidays = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [holidaysSettings, setHolidaysSettings] = useState('')
  const [loading, setLoading] = useState(true)

  const updateHolidaysChannelError = (error) => {
    console.log(error)
  }

  const updateHolidaysChannelSuccess = (response) => {
    setHolidaysSettings(response.data)
  }

  const updateHolidaysChannel = (values) => {
    setLoading(true)

    agent.GuildSettings.updateSettings(selectedGuild.id, values)
      .then(updateHolidaysChannelSuccess, updateHolidaysChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    setHolidaysSettings(response.data)
  }

  const getGuildSettings = () => {
    setLoading(true)

    return agent.GuildSettings.getSettings(selectedGuild.id)
      .then(getGuildSettingsSuccess, getGuildSettingsError)
      .then(() => setLoading(false))
  }

  useEffect(() => {
    getGuildSettings()
  }, [])

  if (loading) return <PageSpinner />

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Stack>
          <Typography component="h6" variant="h6">
            Basic settings
          </Typography>
          <Typography component="p" variant="p">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={7}>
        <Card>
          <Formik
            initialValues={{
              holidayAnnouncementChannelId: holidaysSettings.holidayAnnouncementChannelId,
            }}
            onSubmit={updateHolidaysChannel}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <>
                <CardContent>
                  <ChannelSelector
                    fullWidth
                    disabled={loading}
                    selectedChannel={values.holidayAnnouncementChannelId}
                    setSelectedChannel={(event) =>
                      setFieldValue('holidayAnnouncementChannelId', event.target.value)
                    }
                    helperText="Ipsam facere beatae nam tempore voluptas illum facilis."
                  />
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleSubmit}>
                    Save
                  </Button>
                </CardActions>
              </>
            )}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Holidays
