import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import _ from 'lodash'
import { Grid, Stack } from '@mui/material'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import Page from '~/components/Page'
import { DRAW_CHALLANGES_CATEGORY_SUFFIX } from './config'
import TopBar from './TopBar'
import Card from './Card'

const DrawChallanges = () => {
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
          key.endsWith(DRAW_CHALLANGES_CATEGORY_SUFFIX),
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
        key.endsWith(DRAW_CHALLANGES_CATEGORY_SUFFIX),
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

  useEffect(() => {
    getDrawConfigs()
  }, [])

  useEffect(() => {
    if (drawConfigs) {
      const drawConfigsEntries = Object.entries({ ...drawConfigs }).filter(([key]) =>
        key.endsWith(DRAW_CHALLANGES_CATEGORY_SUFFIX),
      )
      setFilteredDrawConfigs(drawConfigsEntries)
    }
  }, [tab, loading])

  if (loading || _.isEmpty(filteredDrawConfigs)) return

  console.log(filteredDrawConfigs, 'qeggeqegqgeq')

  return (
    <Page title="Draw challanges">
      {!_.isEmpty(filteredDrawConfigs) && (
        <Stack direction="column" gap="1rem">
          <TopBar />
          <Grid container spacing={2}>
            {Object.entries(
              filteredDrawConfigs?.find(
                ([key]) => key === `${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`,
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

export default DrawChallanges
