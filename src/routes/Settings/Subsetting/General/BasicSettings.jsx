import React from 'react'
import { Formik } from 'formik'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import timezones from '~/utils/timezones.json'
import languages from '~/utils/languages.json'

const BasicSettings = ({ guildSettings, updateGuildSettings }) => (
  <>
    <Grid item xs={5}>
      <Stack>
        <Typography component="h2" variant="h5">
          Basic settings
        </Typography>
        <Typography component="p" variant="p">
          Tailor the bot's language settings to match your server's preferred language, ensuring a
          consistent and comfortable user experience for all members.
        </Typography>
      </Stack>
    </Grid>
    <Grid item xs={7}>
      <Card>
        <Formik
          initialValues={{
            timezone: guildSettings.timezone ?? '',
            language: guildSettings.language ?? '',
          }}
          onSubmit={updateGuildSettings}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <>
              <CardContent>
                <Stack>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Timezone</InputLabel>
                    <Select
                      value={values.timezone}
                      onChange={(event) => setFieldValue('timezone', event.target.value)}
                    >
                      {Object.entries(timezones).map(([key, value]) => (
                        <MenuItem value={key}>{value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
                    <Select
                      value={values.language}
                      onChange={(event) => setFieldValue('language', event.target.value)}
                    >
                      {Object.entries(languages).map(([key, value]) => (
                        <MenuItem value={key}>{value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
