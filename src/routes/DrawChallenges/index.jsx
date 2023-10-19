import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Grid, IconButton, Stack } from '@mui/material'
import { SettingsRounded } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import _ from 'lodash'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import agent from '~/api/agent'
import Page from '~/components/Page'
import { DRAW_CHALLENGES_CATEGORY_SUFFIX, defaultDrawChallengesValue } from './config'
import { filterDrawChallenges } from './utils'
import TopBar from './TopBar'
import Card from './Card'

const DrawChallenges = () => {
  const navigate = useNavigate()
  const { selectedGuild } = useContext(SelectedGuildContext)
  const { enqueueSnackbar } = useSnackbar()
  const [drawConfigs, setDrawConfigs] = useState(defaultDrawChallengesValue)
  const [filteredDrawConfigs, setFilteredDrawConfigs] = useState(
    filterDrawChallenges(defaultDrawChallengesValue),
  )
  const [loading, setLoading] = useState(true)
  const [selectedDrawConfigIndex, setSelectedDrawConfigIndex] = useState(null)
  const [selectedDrawConfigType, setSelectedDrawConfigType] = useState(null)
  const [selectedDrawConfigInput, setSelectedDrawConfigInput] = useState(null)
  const { tab } = useParams()

  const getDrawConfigsError = (error) => {
    if (error.response.status === 404) return error

    return enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const getDrawCofnigsSuccess = (response) => {
    if (_.isEmpty(response?.data)) return response

    setDrawConfigs({ ...response.data })
    return setFilteredDrawConfigs(filterDrawChallenges(response.data))
  }

  const getDrawConfigs = () => {
    setLoading(true)
    return agent.Draws.getDrawConfigs(selectedGuild.id)
      .then(getDrawCofnigsSuccess, getDrawConfigsError)
      .finally(() => setLoading(false))
  }

  const updateDrawConfigsError = (error) => {
    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const updateDrawConfigsSuccess = (response) => {
    setDrawConfigs({ ...response.data })
  }

  const updateDrawConfigs = (body) =>
    agent.Draws.updateDrawConfigs(selectedGuild.id, body).then(
      updateDrawConfigsSuccess,
      updateDrawConfigsError,
    )

  useEffect(() => {
    getDrawConfigs()
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
        <IconButton onClick={() => navigate('/settings/challenges')}>
          <SettingsRounded />
        </IconButton>
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
