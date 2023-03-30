import { Grid, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import agent from '~/api/agent'
import CardScrollList from '~/components/CardScrollList'
import SubItem from './SubItem'
import TopBar from './TopBar'

const DrawChallanges = () => {
  const [drawConfigs, setDrawConfigs] = useState()
  const [loading, setLoading] = useState(true)
  const { tab } = useParams()

  const getDrawConfigsError = (error) => {
    console.log(error)
  }

  const getDrawCofnigsSuccess = (response) => {
    setDrawConfigs(response.data)
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

  if (loading) return

  return (
    <Stack direction="column" gap="1rem">
      <TopBar />
      <Grid container spacing={2}>
        {Object.entries(drawConfigs)
          .filter(([key, value]) => !!value && key.startsWith(tab))
          .map(([, drawConfigValue]) =>
            Object.entries(drawConfigValue).map(([key, value]) => (
              <Grid item xs={6}>
                <CardScrollList
                  title={key}
                  listConfig={{
                    itemData: {
                      resources: value,
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
