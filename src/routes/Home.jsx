import React, { useContext } from 'react'
import _ from 'lodash'
import UserContext from '~/contexts/UserContext'
import Landing from './Landing'
import Dashboard from './Dashboard/Dashboard'

const Home = () => {
  const { user } = useContext(UserContext)

  if (_.isEmpty(user)) return <Landing />

  return <Dashboard />
}

export default Home
