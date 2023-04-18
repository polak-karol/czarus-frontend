import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import agent from '~/api/agent'
import UserContext from '~/contexts/UserContext'

const Auth = () => {
  const { user, setUser } = useContext(UserContext)
  const [searchParam] = useSearchParams()

  const sendDiscordCodeError = (error) => {
    console.log(error)
  }

  const sendDiscordCodeSuccess = (response) => {
    console.log(response.data)
    setUser(response.data.user)
  }

  const sendDiscordCode = () => {
    const body = { code: searchParam.get('code') }
    agent.User.sendDiscordCode(body).then(sendDiscordCodeSuccess, sendDiscordCodeError)
  }

  useEffect(() => {
    sendDiscordCode()
  }, [])

  useEffect(() => {
    console.log(user, 'f')
  }, [JSON.stringify(user)])

  return <div>Wait</div>
}

export default Auth
