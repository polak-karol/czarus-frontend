import React, { useContext, useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import ChannelSelector from '~/components/ChannelSelector'
import PageSpinner from '~/components/PageSpinner'

const Birthdays = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [birthdaysSettings, setBirthdaysSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const updateBirthdaysChannelError = (error) => {
    console.log(error)
  }

  const updateBirthdaysChannelSuccess = (response) => {
    setBirthdaysSettings(response.data)
  }

  const updateBirthdaysChannel = (values) => {
    setLoading(true)

    agent.GuildSettings.updateSettings(selectedGuild.id, values)
      .then(updateBirthdaysChannelSuccess, updateBirthdaysChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    setBirthdaysSettings(response.data)
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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.{' '}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={7}>
        <Card>
          <Formik
            initialValues={{
              birthdaysAnnouncementChannelId: birthdaysSettings.birthdaysAnnouncementChannelId,
              birthdaysHandleChannelId: birthdaysSettings.birthdaysHandleChannelId,
            }}
            onSubmit={updateBirthdaysChannel}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <>
                <CardContent>
                  <Stack>
                    <ChannelSelector
                      fullWidth
                      disabled={loading}
                      selectedChannel={values.birthdaysAnnouncementChannelId}
                      setSelectedChannel={(event) =>
                        setFieldValue('birthdaysAnnouncementChannelId', event.target.value)
                      }
                      helperText="Channel to announce birthdays."
                    />
                    <ChannelSelector
                      fullWidth
                      disabled={loading}
                      selectedChannel={values.birthdaysHandleChannelId}
                      setSelectedChannel={(event) =>
                        setFieldValue('birthdaysHandleChannelId', event.target.value)
                      }
                      helperText="Channel to handle birthdays."
                    />
                  </Stack>
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

export default Birthdays
