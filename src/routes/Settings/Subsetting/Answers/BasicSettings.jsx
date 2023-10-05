import React from 'react'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import { Formik } from 'formik'
import ChannelSelector from '~/components/ChannelSelector'

const BasicSettings = ({ answersSettings, updateAnswersChannel }) => (
  <>
    <Grid item xs={5}>
      <Stack>
        <Typography component="h2" variant="h5">
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
  </>
)

export default BasicSettings
