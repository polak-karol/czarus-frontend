import React, { useState, useEffect, useRef } from 'react'
import Badge from '@mui/material/Badge'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import moment from 'moment'
import { Tooltip } from '@mui/material'
import UpdateHolidayModal from './UpdateHolidayModal'

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth()
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth))

      resolve({ daysToHighlight })
    }, 500)

    signal.onabort = () => {
      clearTimeout(timeout)
      reject(new DOMException('aborted', 'AbortError'))
    }
  })
}

const ServerDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > 0

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : undefined}
    >
      <Tooltip disableFocusListener disableTouchListener title="Add">
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Tooltip>
    </Badge>
  )
}

const Holidays = () => {
  const requestAbortController = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15])
  const [selectedDate, setSelectedDate] = useState(moment())
  const [updateHolidayModalActive, setUpdateHolidayModalActive] = useState(false)

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController()
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight)
        setIsLoading(false)
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error
        }
      })

    requestAbortController.current = controller
  }

  useEffect(() => {
    fetchHighlightedDays(moment())
    // abort request on unmount
    return () => requestAbortController.current?.abort()
  }, [])

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort()
    }

    setIsLoading(true)
    setHighlightedDays([])
    fetchHighlightedDays(date)
  }

  return (
    <>
      <DateCalendar
        value={selectedDate}
        onChange={(newValue) => {
          setUpdateHolidayModalActive(true)
          setSelectedDate(newValue)
        }}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
      <UpdateHolidayModal
        date={selectedDate}
        open={updateHolidayModalActive}
        onClose={() => setUpdateHolidayModalActive(false)}
      />
    </>
  )
}

export default Holidays
