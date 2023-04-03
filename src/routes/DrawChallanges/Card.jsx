import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import CardScrollList from '~/components/CardScrollList'
import CardActions from './CardActions'
import SubItem from './SubItem'

const Card = ({
  drawConfigItemKey,
  tab,
  listConfig,
  drawConfigs,
  updateDrawConfigs,
  setFilteredDrawConfigs,
  filteredDrawConfigs,
  drawConfigKey,
  setSaveActionsAllowed,
  saveActionsAllowed,
}) => {
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
        listConfig={listConfig}
        Item={SubItem}
        Actions={
          <CardActions
            disabledSaveActions={!saveActionsAllowed}
            cancelAction={() =>
              setFilteredDrawConfigs(
                Object.entries(drawConfigs).filter(
                  ([drawConfigsKey, drawConfigsValue]) =>
                    !!drawConfigsValue && drawConfigsKey.startsWith(tab),
                ),
              )
            }
            saveAction={() => updateDrawConfigs({})}
          />
        }
      />
    </Grid>
  )
}

export default Card
