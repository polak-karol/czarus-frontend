import React from 'react'
import { Button } from '@mui/material'
import Page from '~/components/Page'
import BirthdaysTable from './BirthdayTable'

const Birthdays = () => (
  <Page title="Birthdays" actions={<Button>Select channel</Button>}>
    <BirthdaysTable />
  </Page>
)

export default Birthdays
