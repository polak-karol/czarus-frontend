import React from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Container } from '@mui/material'
import App from '../components/App'
import Home from './Home/Home'
import Answers from './Answers'
import Birthdays from './Birthdays'
import ErrorPage from './Error/ErrorPage'
import Holidays from './Holidays'
import DrawChallanges from './DrawChallanges'
import Login from './Login'

const BrowserRouter = ({ basename, children, window }) => {
  const historyRef = React.useRef()
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window })
  }

  const history = historyRef.current
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })

  React.useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
      <App>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Container fixed>
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
            </Routes>
          </Container>
        </LocalizationProvider>
      </App>
    </Router>
  )
}

export default BrowserRouter
