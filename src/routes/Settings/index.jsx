import React from 'react'
import { Grid } from '@mui/material'
import {
  CakeRounded,
  CalendarMonthRounded,
  ChatRounded,
  SettingsRounded,
  EmojiEventsRounded,
} from '@mui/icons-material'
import Page from '~/components/Page'
import SettingsItem from './SettingsItem'

const Settings = () => (
  <Page title="Settings">
    <Grid container spacing={2}>
      <SettingsItem
        Icon={SettingsRounded}
        title="General settings"
        content="Lorem, ipsum dolor sit amet consectetur."
      />
      <SettingsItem
        Icon={CakeRounded}
        title="Birthdays settings"
        content="Lorem, ipsum dolor sit amet consectetur."
      />
      <SettingsItem
        Icon={EmojiEventsRounded}
        title="Draw challenges settings"
        content="Lorem, ipsum dolor sit amet consectetur."
      />
      <SettingsItem
        Icon={CalendarMonthRounded}
        title="Holidays settings"
        content="Lorem, ipsum dolor sit amet consectetur."
      />
      <SettingsItem
        Icon={ChatRounded}
        title="Answers settings"
        content="Lorem, ipsum dolor sit amet consectetur."
      />
    </Grid>
  </Page>
)

export default Settings
