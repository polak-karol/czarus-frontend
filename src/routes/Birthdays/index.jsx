import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { useSnackbar } from 'notistack'
import { SettingsRounded } from '@mui/icons-material'
import agent from '~/api/agent'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import Page from '~/components/Page'
import BirthdaysTable from './BirthdayTable'

const Birthdays = () => {
  const navigate = useNavigate()
  const [pageLoading, setPageLoading] = useState(false)
  const [birthdaysList, setBirthdaysList] = useState([])
  const [refreshBirthdayList, setRefreshBirthdayList] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { selectedGuild } = useContext(SelectedGuildContext)

  const getBirthdaysSuccess = (response) => {
    setBirthdaysList(response.data)
  }

  const getBirthdaysError = (error) => {
    enqueueSnackbar(error.response.data.msg, ERROR_SNACKBAR_CONFIG)
  }

  const getBirthdays = () => {
    setPageLoading(true)
    agent.Birthdays.getBirthdays(selectedGuild.id)
      .then(getBirthdaysSuccess, getBirthdaysError)
      .finally(() => setPageLoading(false))
  }

  useEffect(() => {
    getBirthdays()
  }, [refreshBirthdayList])

  if (pageLoading) return

  return (
    <Page
      title="Birthdays"
      actions={
        <IconButton onClick={() => navigate('/settings/birthdays')}>
          <SettingsRounded />
        </IconButton>
      }
    >
      <BirthdaysTable
        birthdaysList={birthdaysList}
        setBirthdaysList={setBirthdaysList}
        setPageLoading={setPageLoading}
        refreshBirthdayList={refreshBirthdayList}
        setRefreshBirthdayList={setRefreshBirthdayList}
      />
    </Page>
  )
}

export default Birthdays
