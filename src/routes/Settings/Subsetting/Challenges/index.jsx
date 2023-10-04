import React, { useContext, useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import ChannelSelector from '~/components/ChannelSelector'
import PageSpinner from '~/components/PageSpinner'

const Challenges = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [challengesSettings, setChallengesSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const updateChallangesChannelError = (error) => {
    console.log(error)
  }

  const updateChallangesChannelSuccess = (response) => {
    setChallengesSettings(response.data)
  }

  const updateChallangesChannel = (values) => {
    setLoading(true)

    return agent.GuildSettings.updateSettings(selectedGuild.id, values)
      .then(updateChallangesChannelSuccess, updateChallangesChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    setChallengesSettings(response.data)
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
              drawChallengesWritingHandleChannelId:
                challengesSettings.drawChallengesWritingHandleChannelId,
              drawChallengesGraphicHandleChannelId:
                challengesSettings.drawChallengesGraphicHandleChannelId,
              drawChallengesMusicHandleChannelId:
                challengesSettings.drawChallengesMusicHandleChannelId,
            }}
            onSubmit={updateChallangesChannel}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <>
                <CardContent>
                  <Stack>
                    <ChannelSelector
                      fullWidth
                      disabled={loading}
                      selectedChannel={values.drawChallengesWritingHandleChannelId}
                      setSelectedChannel={(event) =>
                        setFieldValue('drawChallengesWritingHandleChannelId', event.target.value)
                      }
                      helperText="Writing challenges."
                    />
                    <ChannelSelector
                      fullWidth
                      disabled={loading}
                      selectedChannel={values.drawChallengesGraphicHandleChannelId}
                      setSelectedChannel={(event) =>
                        setFieldValue('drawChallengesGraphicHandleChannelId', event.target.value)
                      }
                      helperText="Graphic challenges"
                    />
                    <ChannelSelector
                      fullWidth
                      disabled={loading}
                      selectedChannel={values.drawChallengesMusicHandleChannelId}
                      setSelectedChannel={(event) =>
                        setFieldValue('drawChallengesMusicHandleChannelId', event.target.value)
                      }
                      helperText="Music challenges"
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

export default Challenges
