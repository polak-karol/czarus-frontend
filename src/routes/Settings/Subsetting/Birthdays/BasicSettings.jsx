import React from 'react'
import { Formik } from 'formik'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import ChannelSelector from '~/components/ChannelSelector'

const BasicSettings = ({ birthdaysConfig, updateBirthdaysConfig }) => (
  <>
    <Grid item xs={5}>
      <Stack>
        <Typography component="h2" variant="h5">
          Basic settings
        </Typography>
        <Typography component="p" variant="p">
          Set up channel announcements for birthday celebrations.
        </Typography>
      </Stack>
    </Grid>
    <Grid item xs={7}>
      <Card>
        <Formik
          initialValues={{
            birthdaysAnnouncementChannelId: birthdaysConfig.birthdaysAnnouncementChannelId ?? '',
            birthdaysHandleChannelId: birthdaysConfig.birthdaysHandleChannelId ?? '',
          }}
          onSubmit={updateBirthdaysConfig}
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
