import React, { useState } from 'react'
import Page from '~/components/Page'
import BirthdaysTable from './BirthdayTable'
import ChannelSelector from '~/components/ChannelSelector'

const Birthdays = () => {
  const [selectedChannel, setSelectedChannel] = useState('')

  return (
    <Page
      title="Birthdays"
      actions={
        <ChannelSelector
          selectedChannel={selectedChannel}
          setSelectedChannel={(event) => setSelectedChannel(event.target.value)}
        />
      }
    >
      <BirthdaysTable />
    </Page>
  )
}

export default Birthdays
