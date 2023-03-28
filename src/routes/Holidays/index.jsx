import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import agent from '~/api/agent'
import UpdateHolidayModal from './UpdateHolidayModal'
import DayPicker from './DayPicker'

const Holidays = () => {
  const [loading, setLoading] = useState(false)
  const [holidaysData, setHolidaysData] = useState([1, 2, 15])
  const [selectedDate, setSelectedDate] = useState(moment())
  const [message, setMessage] = useState('')
  const [updateHolidayModalActive, setUpdateHolidayModalActive] = useState(false)

  const getHolidaysError = (error) => {
    console.log(error)
  }

  const getHolidaysSuccess = (response) => {
    setHolidaysData(response.data)
  }

  const getHolidays = (date) => {
    const startOfMonth = date.startOf('month').format('YYYY-MM-DD')
    const endOfMonth = date.endOf('month').format('YYYY-MM-DD')

    agent.Holidays.getHolidays('guild_id', { endDate: endOfMonth, startDate: startOfMonth })
      .then(getHolidaysSuccess, getHolidaysError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getHolidays(moment())
  }, [])

  const handleMonthChange = (date) => {
    setLoading(true)
    setHolidaysData([])
    getHolidays(date)
  }

  return (
    <Stack direction="column">
      <Typography variant="h3" component="h3">
        Holidays
      </Typography>
      <Grid container gap="1.6rem">
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
            <Card>
              <CardContent>
                Veniam exercitation sunt eu laboris consectetur sint labore sit. Lorem esse veniam
                veniam ullamco. Aute excepteur nisi ex Lorem est aute elit irure. Tempor voluptate
                tempor adipisicing sint quis commodo nulla qui proident velit deserunt nulla. Culpa
                enim ex mollit adipisicing non magna ex excepteur eu id esse adipisicing. Officia
                veniam adipisicing deserunt dolor. Proident aliqua ut amet sit incididunt enim
                mollit sint reprehenderit adipisicing cupidatat dolore consequat tempor. Officia
                nostrud ut voluptate qui aliquip laboris et. Irure Lorem deserunt elit tempor tempor
                sunt non consequat commodo ullamco sit. Lorem sit occaecat duis Lorem consequat
                ipsum sunt pariatur enim aute ullamco adipisicing mollit. Nulla nulla officia
                occaecat nisi quis commodo aliqua proident consectetur velit exercitation. Magna
                adipisicing qui magna amet consequat ad culpa culpa. Do reprehenderit exercitation
                fugiat id occaecat reprehenderit eu aliquip velit sit eiusmod nisi magna. Consequat
                quis enim non minim eiusmod. Velit pariatur est est nulla qui enim ut. Incididunt
                laborum ipsum deserunt culpa nisi nisi irure fugiat non ea. Anim tempor non irure
                sint laborum. Fugiat laborum velit et tempor eu aliquip incididunt.
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                Veniam exercitation sunt eu laboris consectetur sint labore sit. Lorem esse veniam
                veniam ullamco. Aute excepteur nisi ex Lorem est aute elit irure. Tempor voluptate
                tempor adipisicing sint quis commodo nulla qui proident velit deserunt nulla. Culpa
                enim ex mollit adipisicing non magna ex excepteur eu id esse adipisicing. Officia
                veniam adipisicing deserunt dolor. Proident aliqua ut amet sit incididunt enim
                mollit sint reprehenderit adipisicing cupidatat dolore consequat tempor. Officia
                nostrud ut voluptate qui aliquip laboris et. Irure Lorem deserunt elit tempor tempor
                sunt non consequat commodo ullamco sit. Lorem sit occaecat duis Lorem consequat
                ipsum sunt pariatur enim aute ullamco adipisicing mollit. Nulla nulla officia
                occaecat nisi quis commodo aliqua proident consectetur velit exercitation. Magna
                adipisicing qui magna amet consequat ad culpa culpa. Do reprehenderit exercitation
                fugiat id occaecat reprehenderit eu aliquip velit sit eiusmod nisi magna. Consequat
                quis enim non minim eiusmod. Velit pariatur est est nulla qui enim ut. Incididunt
                laborum ipsum deserunt culpa nisi nisi irure fugiat non ea. Anim tempor non irure
                sint laborum. Fugiat laborum velit et tempor eu aliquip incididunt.
              </CardContent>
            </Card>
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
