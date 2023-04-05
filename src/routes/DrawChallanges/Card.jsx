import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import CardScrollList from '~/components/CardScrollList'
import CardActions from './CardActions'
import SubItem from './SubItem'
import CardHeaderActions from './CardHeaderActions'

const Card = ({
  drawConfigItemKey,
  drawConfigs,
  updateDrawConfigs,
  setFilteredDrawConfigs,
  filteredDrawConfigs,
  drawConfigKey,
  setSelectedDrawConfigIndex,
  setSelectedDrawConfigType,
  setSelectedDrawConfigInput,
  drawConfigItemValue,
  selectedDrawConfigIndex,
  selectedDrawConfigType,
  selectedDrawConfigInput,
}) => {
  const [saveActionsAllowed, setSaveActionsAllowed] = useState(false)

  useEffect(() => {
    if (
      JSON.stringify(drawConfigs[drawConfigKey][drawConfigItemKey]) !==
      JSON.stringify(Object.fromEntries(filteredDrawConfigs)[drawConfigKey][drawConfigItemKey])
    ) {
      setSaveActionsAllowed(true)
    } else {
      setSaveActionsAllowed(false)
    }
  }, [
    JSON.stringify(drawConfigs[drawConfigKey][drawConfigItemKey]),
    JSON.stringify(Object.fromEntries(filteredDrawConfigs)[drawConfigKey][drawConfigItemKey]),
  ])

  return (
    <Grid item xs={6}>
      <CardScrollList
        title={drawConfigItemKey}
        listConfig={{
          itemData: {
            resources: drawConfigItemValue,
            resourcesKey: drawConfigItemKey,
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
          itemCount: drawConfigItemValue.length,
          overscanCount: 5,
        }}
        Item={SubItem}
        CardHeaderActions={<CardHeaderActions editAction={() => {}} deleteAction={() => {}} />}
        Actions={
          <CardActions
            disabledSaveActions={!saveActionsAllowed}
            cancelAction={() =>
              setFilteredDrawConfigs(
                Object.entries({ ...drawConfigs }).filter(
                  ([drawConfigsKey, drawConfigsValue]) =>
                    !!drawConfigsValue && drawConfigsKey.endsWith('Config'),
                ),
              )
            }
            saveAction={() => {
              const body = { ...drawConfigs }
              body[drawConfigKey][drawConfigItemKey] = filteredDrawConfigs.find(
                ([key]) => key === drawConfigKey,
              )[1][drawConfigItemKey]
              updateDrawConfigs(body)
            }}
            addAction={() => {
              setFilteredDrawConfigs((state) => {
                const copyState = [...state]
                copyState.map(([key, value]) => {
                  if (key !== drawConfigKey) return [key, value]
                  value[drawConfigItemKey].unshift('')
                  return [key, value]
                })
                return copyState
              })
              setSelectedDrawConfigIndex(0)
              setSelectedDrawConfigType(drawConfigItemKey)
              setSelectedDrawConfigInput('')
            }}
            disabledAddAction={selectedDrawConfigType === drawConfigItemKey}
          />
        }
      />
    </Grid>
  )
}

export default Card
