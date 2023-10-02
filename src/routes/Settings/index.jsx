import React from 'react'
import { Grid } from '@mui/material'
import Page from '~/components/Page'
import SettingsItem from './SettingsItem'
import { settingsConfig } from './configs'

const Settings = () => (
  <Page title="Settings">
    <Grid container spacing={2}>
      {settingsConfig.map((settingsConfigItem) => (
        <SettingsItem
          Icon={settingsConfigItem.icon}
          title={settingsConfigItem.title}
          content={settingsConfigItem.content}
          url={settingsConfigItem.url}
        />
      ))}
    </Grid>
  </Page>
)

export default Settings
