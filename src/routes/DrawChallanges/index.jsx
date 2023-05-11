import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Stack } from '@mui/material'
import agent from '~/api/agent'
import Page from '~/components/Page'
import { DRAW_CHALLANGES_CATEGORY_SUFFIX } from './config'
import TopBar from './TopBar'
import Card from './Card'

const DrawChallanges = () => {
  const [drawConfigs, setDrawConfigs] = useState({})
  const [filteredDrawConfigs, setFilteredDrawConfigs] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedDrawConfigIndex, setSelectedDrawConfigIndex] = useState(null)
  const [selectedDrawConfigType, setSelectedDrawConfigType] = useState(null)
  const [selectedDrawConfigInput, setSelectedDrawConfigInput] = useState(null)
  const { tab } = useParams()

  const getDrawConfigsError = (error) => {
    console.log(error)
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
    return agent.Draws.getDrawConfigs('guild_id')
      .then(getDrawCofnigsSuccess, getDrawConfigsError)
      .finally(() => setLoading(false))
  }

  const updateDrawConfigsError = (error) => {
    console.log(error)
  }

  const updateDrawConfigsSuccess = (response) => {
    setDrawConfigs({ ...response.data })
  }

  const updateDrawConfigs = (body) =>
    agent.Draws.updateDrawConfigs('guild_id', body).then(
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

  if (loading || !drawConfigs) return

  return (
    <Page title="Draw challanges">
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
    </Page>
  )
}

export default DrawChallanges
