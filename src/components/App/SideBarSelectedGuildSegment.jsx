import React, { useContext, useState } from 'react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import GuildsContext from '~/contexts/GuildsContext'
import { readCookie } from '~/utils/global-functions'
import GuildSelectorModal from '../GuildSelectorModal'

const SideBarSelectedGuildSegment = ({ open }) => {
  const { guilds } = useContext(GuildsContext)
  const [guldSelectorModalActive, setGuildSelectorModalActive] = useState(false)
  const selectedGuild = guilds.find((guild) => guild.id === readCookie('selectedGuild'))

  if (!selectedGuild) return

  return (
    <List>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => setGuildSelectorModalActive(true)}
        >
          <ListItemAvatar
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <Avatar
              alt={selectedGuild.name}
              sx={{ bgcolor: '#5865F2' }}
              src={
                selectedGuild.icon
                  ? `https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}`
                  : selectedGuild.name
              }
            />
          </ListItemAvatar>
          <ListItemText primary={selectedGuild.name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
      <GuildSelectorModal
        open={guldSelectorModalActive}
        onClose={() => setGuildSelectorModalActive(false)}
      />
    </List>
  )
}

export default SideBarSelectedGuildSegment
