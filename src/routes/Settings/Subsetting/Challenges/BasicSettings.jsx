import React from 'react'
import { Formik } from 'formik'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import ChannelSelector from '~/components/ChannelSelector'

const BasicSettings = ({ drawConfig, updateDrawConfig }) => (
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
            drawChallengesWritingHandleChannelId:
              drawConfig.drawChallengesWritingHandleChannelId ?? '',
            drawChallengesGraphicHandleChannelId:
              drawConfig.drawChallengesGraphicHandleChannelId ?? '',
            drawChallengesMusicHandleChannelId: drawConfig.drawChallengesMusicHandleChannelId ?? '',
          }}
          onSubmit={updateDrawConfig}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <>
              <CardContent>
                <Stack>
                  <ChannelSelector
                    fullWidth
                    selectedChannel={values.drawChallengesWritingHandleChannelId}
                    setSelectedChannel={(event) =>
                      setFieldValue('drawChallengesWritingHandleChannelId', event.target.value)
                    }
                    helperText="Writing challenges."
                  />
                  <ChannelSelector
                    fullWidth
                    selectedChannel={values.drawChallengesGraphicHandleChannelId}
                    setSelectedChannel={(event) =>
                      setFieldValue('drawChallengesGraphicHandleChannelId', event.target.value)
                    }
                    helperText="Graphic challenges"
                  />
                  <ChannelSelector
                    fullWidth
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
  </>
)

export default BasicSettings
