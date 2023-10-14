import React, { useContext } from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material'
import SelectedGuildChannelsContext from '~/contexts/SelectedGuildChannelsContext'
import { GUILD_CHANNELS_TO_SELECT } from './config'

const ChannelSelector = ({
  selectedChannel,
  setSelectedChannel,
  disabled,
  label = 'Selected channel',
  fullWidth,
  helperText,
}) => {
  const { selectedGuildChannels } = useContext(SelectedGuildChannelsContext)
  const inputStyle = fullWidth ? { width: '100%', m: 1 } : { minWidth: 150, m: 1 }

  return (
    <FormControl variant="standard" sx={inputStyle} disabled={disabled}>
      <InputLabel id="selected-channel">{label}</InputLabel>
      <Select
        labelId="selected-channel"
        id="selected-channel-input"
        value={selectedChannel}
        onChange={(event) => setSelectedChannel(event)}
        label={label}
      >
        {selectedGuildChannels
          .filter(({ type, parentId }) => GUILD_CHANNELS_TO_SELECT.includes(type) && !parentId)
          .map((channel) => (
            <MenuItem key={channel.id} value={channel.id}>
              {channel.name}
            </MenuItem>
          ))}
        {selectedGuildChannels
          .filter(({ type }) => type === 4)
          .map((channel) => {
            const childChannels = selectedGuildChannels.filter(
              ({ parentId, type }) =>
                parentId === channel.id && GUILD_CHANNELS_TO_SELECT.includes(type),
            )

            if (!childChannels.length) return

            const menuItems = childChannels.map((childChannel) => (
              <MenuItem key={childChannel.id} value={childChannel.id}>
                {childChannel.name}
              </MenuItem>
            ))
            menuItems.unshift(<ListSubheader>{channel.name}</ListSubheader>)

            return menuItems
          })}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default ChannelSelector
