import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { SettingsRounded } from '@mui/icons-material'
import Page from '~/components/Page'
import BirthdaysTable from './BirthdayTable'

const Birthdays = () => {
  const navigate = useNavigate()
  const [pageLoading, setPageLoading] = useState(true)

  if (pageLoading) return

  return (
    <Page
      title="Birthdays"
      actions={
        <IconButton onClick={() => navigate('/settings/birthdays')}>
          <SettingsRounded />
        </IconButton>
      }
    >
      <BirthdaysTable setPageLoading={setPageLoading} />
    </Page>
  )
}

export default Birthdays
