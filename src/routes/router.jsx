import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './Error/ErrorPage'
import Root from './Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
])

export default router
