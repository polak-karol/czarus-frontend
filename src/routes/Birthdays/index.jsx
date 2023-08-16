import React, { useContext, useEffect, useState } from 'react'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import Page from '~/components/Page'
import ChannelSelector from '~/components/ChannelSelector'
import BirthdaysTable from './BirthdayTable'

const Birthdays = () => {
  const [selectedChannel, setSelectedChannel] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const { selectedGuild } = useContext(SelectedGuildContext)

  const updateBirthdayChannelError = (error) => {
    console.log(error)
  }

  const updateBirthdayChannelSuccess = (response) => {
    setSelectedChannel(response.data.birthdays_channel_id)
  }

  const updateBirthdayChannel = (channel) => {
    setLoading(true)
    const body = { birthdays_channel_id: channel }

    agent.GuildSettings.updateSettings(selectedGuild.id, body)
      .then(updateBirthdayChannelSuccess, updateBirthdayChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    console.log(response)
    setSelectedChannel(response.data.birthdays_channel_id)
  }

  const getGuildSettings = () => {
    setPageLoading(true)

    agent.GuildSettings.getSettings(selectedGuild.id)
      .then(getGuildSettingsSuccess, getGuildSettingsError)
      .finally(() => setPageLoading(false))
  }

  useEffect(() => {
    getGuildSettings()
  }, [])

  if (pageLoading) return

  return (
    <Page
      title="Birthdays"
      actions={
        <ChannelSelector
          disabled={loading}
          selectedChannel={selectedChannel}
          setSelectedChannel={(event) => updateBirthdayChannel(event.target.value)}
        />
      }
    >
      <BirthdaysTable />
    </Page>
  )
}

export default Birthdays
