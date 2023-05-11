import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import GuildsContext from '~/contexts/GuildsContext'
import { writeCookie } from '~/utils/global-functions'

const GuildSelectorModal = ({ open, onClose }) => {
  const { guilds } = useContext(GuildsContext)
  const navigate = useNavigate('/')

  const handleGuildSelection = (guild) => {
    writeCookie('selectedGuild', guild.id)

    if (onClose) return onClose()

    return navigate('/')
  }

  if (!open) return

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Choose your guild</DialogTitle>
      <List sx={{ pt: 0 }}>
        {guilds.map((guild) => (
          <ListItem disableGutters key={guild.id}>
            <ListItemButton onClick={() => handleGuildSelection(guild)}>
              <ListItemAvatar>
                <Avatar
                  alt={guild.name}
                  sx={{ bgcolor: 'black' }}
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
                />
              </ListItemAvatar>
              <ListItemText primary={guild.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default GuildSelectorModal
