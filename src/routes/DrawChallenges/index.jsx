import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import _ from 'lodash'
import { Grid, Stack } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import ChannelSelector from '~/components/ChannelSelector'
import Page from '~/components/Page'
import { DRAW_CHALLENGES_CATEGORY_SUFFIX } from './config'
import TopBar from './TopBar'
import Card from './Card'

const DrawChallenges = () => {
  const [selectedChannel, setSelectedChannel] = useState('')
  const { selectedGuild } = useContext(SelectedGuildContext)
  const { enqueueSnackbar } = useSnackbar()
  const [drawConfigs, setDrawConfigs] = useState({
    musicConfig: {
      rate: [],
      rhythm: [],
      key: [],
      requiredKey: [],
      forbiddenKey: [],
      genre: [],
      requiredInstrument: [],
      forbiddenInstrument: [],
      mood: [],
    },
    writingConfig: {
      genre: [],
      narration: [],
      theme: [],
      wordsRange: [],
      requiredWord: [],
      forbiddenWord: [],
      character: [],
      place: [],
    },
    paintingConfig: {},
  })
  const [filteredDrawConfigs, setFilteredDrawConfigs] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedDrawConfigIndex, setSelectedDrawConfigIndex] = useState(null)
  const [selectedDrawConfigType, setSelectedDrawConfigType] = useState(null)
  const [selectedDrawConfigInput, setSelectedDrawConfigInput] = useState(null)
  const { tab } = useParams()

  const getDrawConfigsError = (error) => {
    if (error.response.status === 404) {
      setFilteredDrawConfigs(
        Object.entries({ ...drawConfigs }).filter(([key]) =>
          key.endsWith(DRAW_CHALLENGES_CATEGORY_SUFFIX),
        ),
      )
      return
    }

    enqueueSnackbar(error.response.data.msg, ERROR_SNACKBAR_CONFIG)
  }

  const getDrawCofnigsSuccess = (response) => {
    setDrawConfigs({ ...response.data })
    setFilteredDrawConfigs(
      Object.entries({ ...response.data }).filter(([key]) =>
        key.endsWith(DRAW_CHALLENGES_CATEGORY_SUFFIX),
      ),
    )
  }

  const getDrawConfigs = () => {
    setLoading(true)
    return agent.Draws.getDrawConfigs(selectedGuild.id)
      .then(getDrawCofnigsSuccess, getDrawConfigsError)
      .finally(() => setLoading(false))
  }

  const updateDrawConfigsError = (error) => {
    enqueueSnackbar(error.response.data.msg, ERROR_SNACKBAR_CONFIG)
  }

  const updateDrawConfigsSuccess = (response) => {
    setDrawConfigs({ ...response.data })
  }

  const updateDrawConfigs = (body) =>
    agent.Draws.updateDrawConfigs(selectedGuild.id, body).then(
      updateDrawConfigsSuccess,
      updateDrawConfigsError,
    )

  const updateDrawChallengesChannelError = (error) => {
    console.log(error)
  }

  const updateDrawChallengesChannelSuccess = (response) => {
    setSelectedChannel(response.data.draw_challenges_channel_id)
  }

  const updateDrawChallengesChannel = (channel) => {
    setLoading(true)
    const body = { draw_challenges_channel_id: channel }

    agent.GuildSettings.updateSettings(selectedGuild.id, body)
      .then(updateDrawChallengesChannelSuccess, updateDrawChallengesChannelError)
      .finally(() => setLoading(false))
  }

  const getGuildSettingsError = (error) => {
    console.log(error)
  }

  const getGuildSettingsSuccess = (response) => {
    console.log(response)
    setSelectedChannel(response.data.draw_challenges_channel_id)
  }

  const getGuildSettings = () => {
    agent.GuildSettings.getSettings(selectedGuild.id).then(
      getGuildSettingsSuccess,
      getGuildSettingsError,
    )
  }

  useEffect(() => {
    getDrawConfigs()
    getGuildSettings()
  }, [])

  useEffect(() => {
    if (drawConfigs) {
      const drawConfigsEntries = Object.entries({ ...drawConfigs }).filter(([key]) =>
        key.endsWith(DRAW_CHALLENGES_CATEGORY_SUFFIX),
      )
      setFilteredDrawConfigs(drawConfigsEntries)
    }
  }, [tab, loading])

  if (loading || _.isEmpty(filteredDrawConfigs)) return

  return (
    <Page
      title="Draw challenges"
      actions={
        <ChannelSelector
          disabled={loading}
          selectedChannel={selectedChannel}
          setSelectedChannel={(event) => updateDrawChallengesChannel(event.target.value)}
        />
      }
    >
      {!_.isEmpty(filteredDrawConfigs) && (
        <Stack direction="column" gap="1rem">
          <TopBar />
          <Grid container spacing={2}>
            {Object.entries(
              filteredDrawConfigs?.find(
                ([key]) => key === `${tab}${DRAW_CHALLENGES_CATEGORY_SUFFIX}`,
              )?.[1],
            ).map(([key, value]) => (
              <Card
                key={key}
                drawConfigItemKey={key}
                drawConfigs={drawConfigs}
                setDrawConfigs={setDrawConfigs}
                updateDrawConfigs={updateDrawConfigs}
                filteredDrawConfigs={filteredDrawConfigs}
                setFilteredDrawConfigs={setFilteredDrawConfigs}
                setSelectedDrawConfigIndex={setSelectedDrawConfigIndex}
                setSelectedDrawConfigType={setSelectedDrawConfigType}
                setSelectedDrawConfigInput={setSelectedDrawConfigInput}
                selectedDrawConfigType={selectedDrawConfigType}
                selectedDrawConfigIndex={selectedDrawConfigIndex}
                drawConfigItemValue={value}
                selectedDrawConfigInput={selectedDrawConfigInput}
              />
            ))}
          </Grid>
        </Stack>
      )}
    </Page>
  )
}

export default DrawChallenges
