import React from 'react'
import moment from 'moment'
import { Badge, Tooltip } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { HolidayMessage } from './styles'

const DayPicker = ({ holidaysData = [], day, outsideCurrentMonth, ...other }) => {
  const date = holidaysData.find((holiday) => moment(holiday.date).date() === day.date())

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={date || outsideCurrentMonth ? undefined : '❌'}
    >
      {date?.message ? (
        <Tooltip
          disableFocusListener
          disableTouchListener
          title={<HolidayMessage>{date?.message}</HolidayMessage>}
        >
          <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Tooltip>
      ) : (
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      )}
    </Badge>
  )
}

export default DayPicker
