import React from 'react'
import { Formik } from 'formik'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import ChannelSelector from '~/components/ChannelSelector'

const BasicSettings = ({ birthdaysSettings, updateBirthdaysChannel }) => (
  <>
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
                    selectedChannel={values.birthdaysAnnouncementChannelId}
                    setSelectedChannel={(event) =>
                      setFieldValue('birthdaysAnnouncementChannelId', event.target.value)
                    }
                    helperText="Channel to announce birthdays."
                  />
                  <ChannelSelector
                    fullWidth
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
  </>
)

export default BasicSettings
