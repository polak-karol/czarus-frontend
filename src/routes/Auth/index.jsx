import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import _ from 'lodash'
import agent from '~/api/agent'
import GuildsContext from '~/contexts/GuildsContext'
import UserContext from '~/contexts/UserContext'
import { ERROR_SNACKBAR_CONFIG } from '~/utils/config'
import { writeCookie } from '~/utils/global-functions'
import SelectedGuildContext from '~/contexts/SelectedGuildContext'
import GuildSelectorModal from '~/components/GuildSelectorModal'
import PageSpinner from '~/components/PageSpinner'

const Auth = () => {
  const { user, setUser } = useContext(UserContext)
  const { setGuilds } = useContext(GuildsContext)
  const { selectedGuild } = useContext(SelectedGuildContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [guildSelectorModalActive, setGuildSelectorModalActive] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const sendDiscordCodeError = (error) => {
    if ((error?.response?.code >= 400 || error.code === 'ERR_NETWORK') && _.isEmpty(user)) {
      navigate('/')
    }

    enqueueSnackbar(error.response.data.message, ERROR_SNACKBAR_CONFIG)
  }

  const sendDiscordCodeSuccess = (response) => {
    writeCookie('accessToken', response.data.accessToken)
    writeCookie('refreshToken', response.data.refreshToken)
    setUser(response.data.user)
    setGuilds(response.data.guilds)

    if (!_.isEmpty(selectedGuild)) {
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
    <>
      <PageSpinner />
      <GuildSelectorModal open={guildSelectorModalActive} />
    </>
  )
}

export default Auth
