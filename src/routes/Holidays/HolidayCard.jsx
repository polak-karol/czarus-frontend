import React from 'react'
import { Card, CardContent, CardHeader, Stack } from '@mui/material'
import moment from 'moment'
import { HolidayMessage, HolidayTimestamp } from './styles'

const HolidayCard = ({ holiday }) => {
  if (!holiday) return

  return (
    <Card>
      <CardHeader title="Today" subheader={moment().format('DD-MM-YYYY')} />
      <CardContent>
        <HolidayMessage>{holiday.message}</HolidayMessage>
        <Stack alignItems="flex-end">
          <HolidayTimestamp>
            {`Created at ${moment(holiday.createdAt).format('DD-MM-YYYY hh:mm:ss')}`}
          </HolidayTimestamp>
          <HolidayTimestamp>
            {`Updated at ${moment(holiday.updatedAt).format('DD-MM-YYYY hh:mm:ss')}`}
          </HolidayTimestamp>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default HolidayCard
