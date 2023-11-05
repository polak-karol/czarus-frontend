import React, { useState } from 'react'
import { Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import ModifyWishesModal from './ModifyWishesModal'

const WishesSettings = () => {
  const [modifyWishesModalActive, setModifyWishesModalActive] = useState(false)

  return (
    <>
      <Grid item xs={5}>
        <Stack>
          <Typography component="h2" variant="h5">
            Wishes settings
          </Typography>
          <Typography component="p" variant="p">
            Craft personalized birthday messages for your server members, adding a heartfelt touch
            to their special day.
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={7}>
        <Card>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Stack flexDirection="row" gap={2}>
              <Container>
                <Typography component="span" variant="subtitle2">
                  Wishes singular
                </Typography>
                <Typography component="p" variant="caption">
                  Modify wishes for a single birthday.
                </Typography>
              </Container>
              <Button onClick={() => setModifyWishesModalActive(true)}>Modify</Button>
            </Stack>
            <Stack flexDirection="row" gap={2}>
              <Container>
                <Typography component="span" variant="subtitle2">
                  Wishes plural
                </Typography>
                <Typography component="p" variant="caption">
                  Modify wishes for many birthdays.
                </Typography>
              </Container>
              <Button>Modify</Button>
            </Stack>
          </CardContent>
        </Card>
        <ModifyWishesModal
          active={modifyWishesModalActive}
          onClose={() => setModifyWishesModalActive(false)}
        />
      </Grid>
    </>
  )
}
export default WishesSettings
