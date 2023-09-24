import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import _ from 'lodash'
import { ThemeProvider } from '@mui/material/styles'
import { Box, CssBaseline, Paper } from '@mui/material'
import UserContext from '~/contexts/UserContext'
import { customTheme } from '~/utils/theme'
import agent from '~/api/agent'
import { readCookie } from '~/utils/global-functions'
import GuildsContext from '~/contexts/GuildsContext'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import SelectedGuildChannelsContext from '~/contexts/SelectedGuildChannelsContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import PageSpinner from '../PageSpinner'
import { DrawerHeader, isRestrictedPath } from './utils'
import TopBar from './TopBar'
import SideBar from './SideBar'

const App = ({ children }) => {
  const { user, setUser } = useContext(UserContext)
  const { setGuilds } = useContext(GuildsContext)
  const { setSelectedGuildChannels } = useContext(SelectedGuildChannelsContext)
  const { enqueueSnackbar } = useSnackbar()
  const { setSelectedGuild } = useContext(SelectedGuildContext)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getGuildChannelsSuccess = (response) => {
    setSelectedGuildChannels(response.data)
  }

  const getGuildChannelsError = (error) => {
    console.log(error)
  }

  const getCurrentUserError = (error) => {
    enqueueSnackbar(error.response.data.msg || error.response.data.message, ERROR_SNACKBAR_CONFIG)
    if ((error?.response?.code >= 400 || error.code === 'ERR_NETWORK') && _.isEmpty(user)) {
      return navigate('/')
    }
    return error
  }

  const getCurrentUserSuccess = (response) => {
    setUser(response.data.user)
    setGuilds(response.data.guilds)
    setSelectedGuild(response.data.guilds.find((guild) => guild.id === readCookie('selectedGuild')))
    agent.Guild.getGuildChannels(readCookie('selectedGuild')).then(
      getGuildChannelsSuccess,
      getGuildChannelsError,
    )

    return response
  }

  const getCurrentUser = () => {
    setLoading(true)

    if (!readCookie('accessToken')) {
      setLoading(false)
      return navigate('/')
    }

    return agent.User.getCurrentUser()
      .then(getCurrentUserSuccess, getCurrentUserError)
      .finally(() => setLoading(false))
  }

  const getSelectedGuildChannelsError = (error) => {
    console.log(error)
    enqueueSnackbar(error.response.data.msg, ERROR_SNACKBAR_CONFIG)
  }

  const getSelectedGuildChannelsSuccess = (response) => {
    console.log(response)
  }

  const getSelectedGuildChannels = () => {
    const selectedGuild = readCookie('selectedGuild')

    if (!selectedGuild) return null

    return agent.Guild.getGuildChannels(selectedGuild).then(
      getSelectedGuildChannelsSuccess,
      getSelectedGuildChannelsError,
    )
  }

  useEffect(() => {
    if (isRestrictedPath()) {
      getCurrentUser()
      getSelectedGuildChannels()
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return <PageSpinner />

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex', padding: 0 }}>
        <CssBaseline />
        <TopBar open={open} setOpen={setOpen} />
        <SideBar open={open} setOpen={setOpen} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, padding: 0 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
