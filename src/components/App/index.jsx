import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { Box, CssBaseline } from '@mui/material'
import UserContext from '~/contexts/UserContext'
import { customTheme } from '~/utils/theme'
import agent from '~/api/agent'
import { readCookie } from '~/utils/global-functions'
import GuildsContext from '~/contexts/GuildsContext'
import { DrawerHeader } from './utils'
import TopBar from './TopBar'
import SideBar from './SideBar'
import PageSpinner from '../PageSpinner'

const App = ({ children }) => {
  const { setUser } = useContext(UserContext)
  const { setGuilds } = useContext(GuildsContext)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getCurrentUserError = (error) => {
    console.log(error)
    // return navigate('/login')
  }

  const getCurrentUserSuccess = (response) => {
    setUser(response.data.user)
    setGuilds(response.data.guilds)
  }

  const getCurrentUser = () => {
    setLoading(true)

    if (!readCookie('accessToken')) {
      return navigate('/login')
    }

    return agent.User.getCurrentUser()
      .then(getCurrentUserSuccess, getCurrentUserError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  if (loading) return <PageSpinner />

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar open={open} setOpen={setOpen} />
        <SideBar open={open} setOpen={setOpen} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
