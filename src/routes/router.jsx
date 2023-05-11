import React, { useLayoutEffect, useRef, useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import UserContext from '~/contexts/UserContext'
import App from '../components/App'
import Home from './Home/Home'
import Answers from './Answers'
import Birthdays from './Birthdays'
import ErrorPage from './Error/ErrorPage'
import Holidays from './Holidays'
import DrawChallanges from './DrawChallanges'
import Login from './Login'
import Auth from './Auth'

const BrowserRouter = ({ basename, children, window }) => {
  const [user, setUser] = useState({})
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
        <App>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Routes>
              <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
              <Route path="/answers" element={<Answers />} errorElement={<ErrorPage />} />
              <Route path="/birthdays" element={<Birthdays />} errorElement={<ErrorPage />} />
              <Route path="/holidays" element={<Holidays />} errorElement={<ErrorPage />} />
              <Route
                path="/draw-challanges/:tab"
                element={<DrawChallanges />}
                errorElement={<ErrorPage />}
              />
              <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
              <Route path="/authorize" element={<Auth />} errorElement={<ErrorPage />} />
            </Routes>
          </LocalizationProvider>
        </App>
      </UserContext.Provider>
    </Router>
  )
}

export default BrowserRouter
