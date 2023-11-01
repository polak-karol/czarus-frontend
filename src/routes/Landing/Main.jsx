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
        Looking to bring more excitement and functionality to your Discord server? Look no further!
        Czaruś is here to take your server to the next level. With a wide range of features, it's
        your go-to solution for enhancing your server's experience.
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
