import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import agent from '~/api/agent'
import UpdateHolidayModal from './UpdateHolidayModal'
import DayPicker from './DayPicker'
import HolidayCard from './HolidayCard'

const Holidays = () => {
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [holidaysData, setHolidaysData] = useState([1, 2, 15])
  const [selectedDate, setSelectedDate] = useState(moment())
  const [message, setMessage] = useState('')
  const [updateHolidayModalActive, setUpdateHolidayModalActive] = useState(false)

  const getHolidaysError = (error) => console.log(error)

  const getHolidaysSuccess = (response) => setHolidaysData(response.data)

  const getHolidays = (date) => {
    setLoadingPage(true)
    const startOfMonth = date.startOf('month').format('YYYY-MM-DD')
    const endOfMonth = date.endOf('month').format('YYYY-MM-DD')

    return agent.Holidays.getHolidays('guild_id', { endDate: endOfMonth, startDate: startOfMonth })
      .then(getHolidaysSuccess, getHolidaysError)
      .finally(() => {
        setLoading(false)
        setLoadingPage(false)
      })
  }

  useEffect(() => {
    getHolidays(moment())
  }, [])

  const handleMonthChange = (date) => {
    setLoading(true)
    setHolidaysData([])
    getHolidays(date)
    return date
  }

  if (loadingPage) return

  return (
    <Stack direction="column">
      <Typography variant="h3" component="h3">
        Holidays
      </Typography>
      <Grid container gap="3rem">
        <Grid xs={3} item>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => {
              setUpdateHolidayModalActive(true)
              setSelectedDate(newValue)
              setMessage(
                holidaysData.find((holiday) => moment(holiday.date).date() === newValue.date())
                  ?.message,
              )
            }}
            loading={loading}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: DayPicker,
            }}
            slotProps={{
              day: {
                holidaysData,
              },
            }}
          />
        </Grid>
        <Grid xs={8} item>
          <Stack direction="column" gap="1.6rem">
            <HolidayCard
              holiday={holidaysData.find(
                (holiday) => moment(holiday.date).date() === moment().date(),
              )}
            />
          </Stack>
        </Grid>
      </Grid>
      <UpdateHolidayModal
        date={selectedDate}
        setHolidaysData={setHolidaysData}
        holidaysData={holidaysData}
        open={updateHolidayModalActive}
        message={message}
        setMessage={setMessage}
        onClose={() => setUpdateHolidayModalActive(false)}
      />
    </Stack>
  )
}

export default Holidays
