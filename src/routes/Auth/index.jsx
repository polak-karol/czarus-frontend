import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import agent from '~/api/agent'
import GuildsContext from '~/contexts/GuildsContext'
import UserContext from '~/contexts/UserContext'
import { readCookie, writeCookie } from '~/utils/global-functions'
import GuildSelectorModal from '~/components/GuildSelectorModal'

const Auth = () => {
  const { setUser } = useContext(UserContext)
  const { setGuilds } = useContext(GuildsContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [guildSelectorModalActive, setGuildSelectorModalActive] = useState(false)

  const sendDiscordCodeError = (error) => {
    console.log(error)
    // navigate('/login')
  }

  const sendDiscordCodeSuccess = (response) => {
    writeCookie('accessToken', response.data.accessToken)
    writeCookie('refreshToken', response.data.refreshToken)
    setUser(response.data.user)
    setGuilds(response.data.guilds)

    if (readCookie('selectedGuild')) {
      return navigate('/')
    }

    return setGuildSelectorModalActive(true)
  }

  const sendDiscordCode = () => {
    const body = { code: searchParams.get('code') }
    agent.User.sendDiscordCode(body).then(sendDiscordCodeSuccess, sendDiscordCodeError)
  }

  useEffect(() => {
    sendDiscordCode()
  }, [])

  return (
    <div>
      Wait
      <GuildSelectorModal open={guildSelectorModalActive} />
    </div>
  )
}

export default Auth
