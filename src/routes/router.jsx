import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './Error/ErrorPage'
import Home from './Home/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
])

export default router
