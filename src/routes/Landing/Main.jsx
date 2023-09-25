import React from 'react'
import { Avatar, Button, Stack, Typography } from '@mui/material'
import CzarusAvatar from '~/media/czarus_avatar.png'
import { AvatarWrapper, IntroDescription, MainSection } from './styles'

const Main = () => (
  <MainSection>
    <AvatarWrapper>
      <Avatar sx={{ width: '30rem', height: '30rem' }} alt="Czarus" src={CzarusAvatar} />
    </AvatarWrapper>
    <IntroDescription>
      <Typography component="h2" variant="h2">
        Czaruś - Discord Bot
      </Typography>
      <Typography component="p" variant="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sed erat in
        condimentum. Nullam maximus tellus eget nibh lobortis, a porttitor purus suscipit. Phasellus
        vel porttitor ipsum.
      </Typography>
      <Stack gap={5} flexDirection="row">
        <Button href={import.meta.env.VITE_DISCORD_INVITE_URL} variant="contained">
          Invite me
        </Button>
        <Button href={import.meta.env.VITE_DISCORD_LOGIN_URL}>Sign in</Button>
      </Stack>
    </IntroDescription>
  </MainSection>
)

export default Main
