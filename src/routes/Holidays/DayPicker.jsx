import React from 'react'
import moment from 'moment'
import { Badge, Tooltip } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'

const DayPicker = ({ holidaysData = [], day, outsideCurrentMonth, ...other }) => {
  const date = holidaysData.find((holiday) => moment(holiday.date).date() === day.date())

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={date || outsideCurrentMonth ? undefined : '❌'}
    >
      <Tooltip disableFocusListener disableTouchListener title={date?.message}>
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Tooltip>
    </Badge>
  )
}

export default DayPicker
