import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Answers from './Answers'
import Birthdays from './Birthdays'
import ErrorPage from './Error/ErrorPage'
import Home from './Home/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/birthdays',
    element: <Birthdays />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/answers',
    element: <Answers />,
    errorElement: <ErrorPage />,
  },
])

export default router
