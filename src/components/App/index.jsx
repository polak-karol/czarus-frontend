import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box, CssBaseline } from '@mui/material'
import { customTheme } from '~/utils/theme'
import agent from '~/api/agent'
import { DrawerHeader } from './utils'
import TopBar from './TopBar'
import SideBar from './SideBar'

const App = ({ children }) => {
  const [open, setOpen] = useState(false)

  const getCurrentUserError = (error) => {
    console.log(error)
  }

  const getCurrentUserSuccess = (response) => {
    console.log(response)
  }

  const getCurrentUser = () => {
    agent.User.getCurrentUser().then(getCurrentUserSuccess, getCurrentUserError)
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

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
