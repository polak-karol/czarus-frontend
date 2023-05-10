import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import agent from '~/api/agent'
import UserContext from '~/contexts/UserContext'
import { writeCookie } from '~/utils/global-functions'

const Auth = () => {
  const { setUser } = useContext(UserContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const sendDiscordCodeError = (error) => {
    console.log(error)
    navigate('/login')
  }

  const sendDiscordCodeSuccess = (response) => {
    writeCookie('accessToken', response.data.accessToken)
    writeCookie('refreshToken', response.data.refreshToken)
    setUser(response.data.user)
    navigate('/')
  }

  const sendDiscordCode = () => {
    const body = { code: searchParams.get('code') }
    agent.User.sendDiscordCode(body).then(sendDiscordCodeSuccess, sendDiscordCodeError)
  }

  useEffect(() => {
    sendDiscordCode()
  }, [])

  return <div>Wait</div>
}

export default Auth
