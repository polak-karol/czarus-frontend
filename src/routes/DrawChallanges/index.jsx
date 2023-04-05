import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Stack, Typography } from '@mui/material'
import agent from '~/api/agent'
import { DRAW_CHALLANGES_CATEGORY_SUFFIX } from './config'
import AddNewCategoryCard from './AddNewCategoryCard'
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
      setFilteredDrawConfigs(
        Object.entries({ ...drawConfigs }).filter(([key]) =>
          key.endsWith(DRAW_CHALLANGES_CATEGORY_SUFFIX),
        ),
      )
    }
  }, [tab])

  if (loading) return

  return (
    <Stack spacing={4}>
      <Typography variant="h3" component="h3">
        Draw challanges
      </Typography>
      <Stack direction="column" gap="1rem">
        <TopBar />
        <Grid container spacing={2}>
          <AddNewCategoryCard setDrawConfigs={setDrawConfigs} drawConfigs={drawConfigs} tab={tab} />
          {filteredDrawConfigs
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .filter(([key]) => key.includes(tab))
            .map(([drawConfigKey, drawConfigValue]) =>
              drawConfigValue
                ? Object.entries(drawConfigValue).map(
                    ([drawConfigItemKey, drawConfigItemValue]) => (
                      <Card
                        key={drawConfigItemKey}
                        drawConfigItemKey={drawConfigItemKey}
                        drawConfigs={drawConfigs}
                        setDrawConfigs={setDrawConfigs}
                        drawConfigKey={drawConfigKey}
                        updateDrawConfigs={updateDrawConfigs}
                        filteredDrawConfigs={filteredDrawConfigs}
                        setFilteredDrawConfigs={setFilteredDrawConfigs}
                        setSelectedDrawConfigIndex={setSelectedDrawConfigIndex}
                        setSelectedDrawConfigType={setSelectedDrawConfigType}
                        setSelectedDrawConfigInput={setSelectedDrawConfigInput}
                        selectedDrawConfigType={selectedDrawConfigType}
                        selectedDrawConfigIndex={selectedDrawConfigIndex}
                        drawConfigItemValue={drawConfigItemValue}
                        selectedDrawConfigInput={selectedDrawConfigInput}
                      />
                    ),
                  )
                : null,
            )}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default DrawChallanges
