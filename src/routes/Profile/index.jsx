import React from 'react'
import { Stack } from '@mui/material'
import Page from '~/components/Page'
import MainCard from './MainCard'
import EmailCard from './EmailCard'
import NitroCard from './NitroCard'

const Profile = () => (
  <Page>
    <Stack flexDirection="row" gap="1.5rem">
      <MainCard />
      <Stack sx={{ flex: 1 }} flexDirection="column" gap="1.5rem">
        <EmailCard />
        <NitroCard />
      </Stack>
    </Stack>
  </Page>
)

export default Profile
