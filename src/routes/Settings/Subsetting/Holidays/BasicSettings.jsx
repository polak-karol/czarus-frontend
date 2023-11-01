import React from 'react'
import { Formik } from 'formik'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import ChannelSelector from '~/components/ChannelSelector'

const BasicSettings = ({ holidaysSettings, updateHolidaysChannel }) => (
  <>
    <Grid item xs={5}>
      <Stack>
        <Typography component="h2" variant="h5">
          Basic settings
        </Typography>
        <Typography component="p" variant="p">
          Set up channel announcements for holiday celebrations.
        </Typography>
      </Stack>
    </Grid>
    <Grid item xs={7}>
      <Card>
        <Formik
          initialValues={{
            holidayAnnouncementChannelId: holidaysSettings.holidayAnnouncementChannelId ?? '',
          }}
          onSubmit={updateHolidaysChannel}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <>
              <CardContent>
                <ChannelSelector
                  fullWidth
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
  </>
)

export default BasicSettings
