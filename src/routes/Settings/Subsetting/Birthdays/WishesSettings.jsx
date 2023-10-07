import React from 'react'
import { Formik } from 'formik'
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'

const WishesSettings = () => (
  <>
    <Grid item xs={5}>
      <Stack>
        <Typography component="h2" variant="h5">
          Wishes settings
        </Typography>
        <Typography component="p" variant="p">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Typography>
      </Stack>
    </Grid>
    <Grid item xs={7}>
      <Card>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ values, setFieldValue, handleSubmit }) => (
            <>
              <CardContent>
                <Stack></Stack>
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

export default WishesSettings
