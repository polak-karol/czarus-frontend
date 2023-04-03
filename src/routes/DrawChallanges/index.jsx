import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Stack } from '@mui/material'
import agent from '~/api/agent'
import CardScrollList from '~/components/CardScrollList'
import SubItem from './SubItem'
import TopBar from './TopBar'

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
    setDrawConfigs(response.data)
    setFilteredDrawConfigs(
      Object.entries(response.data).filter(([key, value]) => !!value && key.startsWith(tab)),
    )
  }

  const getDrawConfigs = () => {
    setLoading(true)
    return agent.Draws.getDrawConfigs('guild_id')
      .then(getDrawCofnigsSuccess, getDrawConfigsError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getDrawConfigs()
  }, [])

  useEffect(() => {
    if (drawConfigs) {
      setFilteredDrawConfigs(
        Object.entries(drawConfigs).filter(([key, value]) => !!value && key.startsWith(tab)),
      )
    }
  }, [tab])

  if (loading) return

  return (
    <Stack direction="column" gap="1rem">
      <TopBar />
      <Grid container spacing={2}>
        {filteredDrawConfigs.map(([drawConfigKey, drawConfigValue]) =>
          Object.entries(drawConfigValue).map(([key, value]) => (
            <Grid item xs={6}>
              <CardScrollList
                title={key}
                listConfig={{
                  itemData: {
                    resources: value,
                    resourcesKey: key,
                    drawConfigKey,
                    setFilteredDrawConfigs,
                    selectedDrawConfigIndex,
                    setSelectedDrawConfigIndex,
                    selectedDrawConfigType,
                    setSelectedDrawConfigType,
                    selectedDrawConfigInput,
                    setSelectedDrawConfigInput,
                  },
                  height: 300,
                  itemSize: 46,
                  itemCount: value.length,
                  overscanCount: 5,
                }}
                Item={SubItem}
              />
            </Grid>
          )),
        )}
      </Grid>
    </Stack>
  )
}

export default DrawChallanges
