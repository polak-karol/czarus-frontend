import React from 'react'
import moment from 'moment'
import { Card, CardContent, CardHeader, Stack } from '@mui/material'
import { HolidayMessage, HolidayTimestamp } from './styles'

const HolidayCard = ({ holiday }) => (
  <Card>
    <CardHeader title="Today" subheader={moment().format('DD-MM-YYYY')} />
    <CardContent>
      <HolidayMessage>{holiday?.message || 'No holiday for today provided.'}</HolidayMessage>
      <Stack alignItems="flex-end">
        <HolidayTimestamp>
          {!!holiday?.createdAt &&
            `Created at ${moment(holiday.createdAt).format('DD-MM-YYYY hh:mm:ss')}`}
        </HolidayTimestamp>
        <HolidayTimestamp>
          {!!holiday?.createdAt &&
            `Updated at ${moment(holiday.updatedAt).format('DD-MM-YYYY hh:mm:ss')}`}
        </HolidayTimestamp>
      </Stack>
    </CardContent>
  </Card>
)

export default HolidayCard
