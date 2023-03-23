import React from 'react'
import { Router, Routes, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import App from '../components/App'
import Home from './Home/Home'
import Answers from './Answers'
import Birthdays from './Birthdays'
import ErrorPage from './Error/ErrorPage'

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
          <Routes>
            <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
            <Route path="/answers" element={<Answers />} errorElement={<ErrorPage />} />
            <Route path="/birthdays" element={<Birthdays />} errorElement={<ErrorPage />} />
          </Routes>
        </LocalizationProvider>
      </App>
    </Router>
  )
}

export default BrowserRouter
