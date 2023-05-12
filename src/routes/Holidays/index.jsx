import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { Alert, AlertTitle, Button, Grid, Stack } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import agent from '~/api/agent'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import UpdateHolidayModal from './UpdateHolidayModal'
import DayPicker from './DayPicker'
import HolidayCard from './HolidayCard'
import Page from '~/components/Page'

const Holidays = () => {
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [loading, setLoading] = useState(false)
  const [holidaysData, setHolidaysData] = useState([1, 2, 15])
  const [selectedDate, setSelectedDate] = useState(moment())
  const [message, setMessage] = useState('')
  const [tomorrowHoliday, setTomorrowHoliday] = useState(null)
  const [updateHolidayModalActive, setUpdateHolidayModalActive] = useState(false)

  const getHolidaysError = (error) => console.log(error)

  const getHolidaysSuccess = (response) => setHolidaysData(response.data)

  const getHolidays = (date) => {
    const startOfMonth = date.startOf('month').format('YYYY-MM-DD')
    const endOfMonth = date.endOf('month').format('YYYY-MM-DD')

    return agent.Holidays.getHolidays(selectedGuild.id, {
      endDate: endOfMonth,
      startDate: startOfMonth,
    })
      .then(getHolidaysSuccess, getHolidaysError)
      .finally(() => setLoading(false))
  }

  const getHolidayForTomorrowError = (error) => console.log(error)

  const getHolidayForTomorrowSuccess = (response) => setTomorrowHoliday(response.data)

  const getHolidayForTomorrow = () =>
    agent.Holidays.getHoliday(selectedGuild.id, moment().add(1, 'day').toISOString()).then(
      getHolidayForTomorrowSuccess,
      getHolidayForTomorrowError,
    )

  useEffect(() => {
    getHolidays(moment())
    getHolidayForTomorrow()
  }, [])

  const handleMonthChange = (date) => {
    setLoading(true)
    setHolidaysData([])
    getHolidays(date)
  }

  return (
    <Page title="Holidays">
      {!tomorrowHoliday && (
        <Alert
          severity="warning"
          variant="outlined"
          action={
            <Button
              onClick={() => {
                setSelectedDate(moment().add(1, 'day'))
                setUpdateHolidayModalActive(true)
                setMessage('')
              }}
              color="inherit"
              size="small"
            >
              ADD
            </Button>
          }
        >
          <AlertTitle>Warning</AlertTitle>
          No holiday for tomorrow!
        </Alert>
      )}
      <Grid container gap="6rem">
        <Grid xs={3} item>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue)
              setMessage(
                holidaysData.find((holiday) => moment(holiday.date).date() === newValue.date())
                  ?.message,
              )
              setUpdateHolidayModalActive(true)
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
    </Page>
  )
}

export default Holidays
