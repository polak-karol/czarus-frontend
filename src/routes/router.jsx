import React, { useLayoutEffect, useRef, useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { SnackbarProvider } from 'notistack'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import UserContext from '~/contexts/UserContext'
import GuildsContext from '~/contexts/GuildsContext'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import SelectedGuildChannelsContext from '~/contexts/SelectedGuildChannelsContext'
import App from '~/components/App'
import Home from './Home/Home'
import Answers from './Answers'
import Birthdays from './Birthdays'
import ErrorPage from './Error/ErrorPage'
import Holidays from './Holidays'
import DrawChallenges from './DrawChallenges'
import Login from './Login'
import Auth from './Auth'
import Profile from './Profile'

const BrowserRouter = ({ basename, children, window }) => {
  const [user, setUser] = useState({})
  const [guilds, setGuilds] = useState([])
  const [selectedGuild, setSelectedGuild] = useState({})
  const [selectedGuildChannels, setSelectedGuildChannels] = useState([])
  const historyRef = useRef()

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window })
  }

  const history = historyRef.current
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
      <UserContext.Provider value={{ user, setUser }}>
        <GuildsContext.Provider value={{ guilds, setGuilds }}>
          <SelectedGuildContext.Provider value={{ selectedGuild, setSelectedGuild }}>
            <SelectedGuildChannelsContext.Provider
              value={{ selectedGuildChannels, setSelectedGuildChannels }}
            >
              <SnackbarProvider maxSnack={3}>
                <App>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Routes>
                      <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
                      <Route path="/answers" element={<Answers />} errorElement={<ErrorPage />} />
                      <Route
                        path="/birthdays"
                        element={<Birthdays />}
                        errorElement={<ErrorPage />}
                      />
                      <Route path="/holidays" element={<Holidays />} errorElement={<ErrorPage />} />
                      <Route
                        path="/draw-challenges/:tab"
                        element={<DrawChallenges />}
                        errorElement={<ErrorPage />}
                      />
                      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
                      <Route path="/authorize" element={<Auth />} errorElement={<ErrorPage />} />
                      <Route path="/profile" element={<Profile />} errorElement={<ErrorPage />} />
                    </Routes>
                  </LocalizationProvider>
                </App>
              </SnackbarProvider>
            </SelectedGuildChannelsContext.Provider>
          </SelectedGuildContext.Provider>
        </GuildsContext.Provider>
      </UserContext.Provider>
    </Router>
  )
}

export default BrowserRouter
