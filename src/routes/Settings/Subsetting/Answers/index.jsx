import React, { useContext, useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import ChannelSelector from '~/components/ChannelSelector'
import PageSpinner from '~/components/PageSpinner'

const Answers = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [answersSettings, setAnswersSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const updateAnswersChannelError = (error) => {
    console.log(error)
  }

  const updateAnswersChannelSuccess = (response) => {
    setAnswersSettings(response.data)
  }

  const updateAnswersChannel = (values) => {
    setLoading(true)

    return agent.GuildSettings.updateSettings(selectedGuild.id, values)
      .then(updateAnswersChannelSuccess, updateAnswersChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    setAnswersSettings(response.data)
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
              answersChannelId: answersSettings.answersChannelId,
            }}
            onSubmit={updateAnswersChannel}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <>
                <CardContent>
                  <ChannelSelector
                    fullWidth
                    disabled={loading}
                    selectedChannel={values.answersChannelId}
                    setSelectedChannel={(event) =>
                      setFieldValue('answersChannelId', event.target.value)
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

export default Answers
