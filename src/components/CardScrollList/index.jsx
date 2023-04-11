import React from 'react'
import { FixedSizeList } from 'react-window'
import { Card, CardActions, CardContent, CardHeader } from '@mui/material'

const CardScrollList = ({ title, Item, Actions, CardHeaderActions, listConfig = {} }) => (
  <Card style={{ flex: 1 }}>
    <CardHeader title={title} action={CardHeaderActions} />
    <CardContent>
      <FixedSizeList
        itemData={listConfig.itemData}
        itemKey={(index) => index}
        height={listConfig.height}
        itemSize={listConfig.itemSize}
        itemCount={listConfig.itemCount}
        overscanCount={listConfig.overscanCount}
      >
        {Item}
      </FixedSizeList>
    </CardContent>
    <CardActions>{Actions}</CardActions>
  </Card>
)

export default CardScrollList
