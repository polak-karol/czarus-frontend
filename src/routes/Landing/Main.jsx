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
        <Button variant="contained">Invite me</Button>
        <Button href="https://discord.com/api/oauth2/authorize?client_id=993578103538458664&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauthorize&response_type=code&scope=identify%20guilds%20email">
          Sign in
        </Button>
      </Stack>
    </IntroDescription>
  </MainSection>
)

export default Main
