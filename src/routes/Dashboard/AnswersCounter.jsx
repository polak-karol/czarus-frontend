import React from 'react'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { answersTitle } from './config'

const AnswersCounter = ({ dashboardData }) => (
  <Grid item xs={12}>
    <Grid container gap={2}>
      {Object.entries(dashboardData.answers)
        .filter(([key]) => key.includes('Answers'))
        .map(([key, value]) => (
          <Grid key={key} item xs={3.5}>
            <Card>
              <CardHeader title={answersTitle[key]} />
              <CardContent>{`${value.length} answers`}</CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  </Grid>
)

export default AnswersCounter
