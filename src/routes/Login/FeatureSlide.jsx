import React from 'react'
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'

const FeatureSlide = ({ slide }) => (
  <Grid container spacing={2}>
    {slide.map((slideElement) => (
      <Grid key={slideElement.title} item xs={4}>
        <Card>
          <CardContent>
            <Stack gap={4}>
              <Typography component="h3" variant="h3">
                {slideElement.title}
              </Typography>
              <Typography component="p" variant="p">
                {slideElement.content}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)

export default FeatureSlide
