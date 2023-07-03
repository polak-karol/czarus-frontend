import React, { useContext } from 'react'
import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material'
import SelectedGuildChannelsContext from '~/contexts/SelectedGuildChannelsContext'

const ChannelSelector = ({ selectedChannel, setSelectedChannel }) => {
  const { selectedGuildChannels } = useContext(SelectedGuildChannelsContext)

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
      <InputLabel id="selected-channel">Selected channel</InputLabel>
      <Select
        labelId="selected-channel"
        id="selected-channel-input"
        value={selectedChannel}
        onChange={(event) => setSelectedChannel(event)}
        label="Selected channel"
      >
        {selectedGuildChannels
          .filter(({ type, parent_id }) => type === 0 && !parent_id)
          .map((channel) => (
            <MenuItem key={channel.id} value={channel.id}>
              {channel.name}
            </MenuItem>
          ))}
        {selectedGuildChannels
          .filter(({ type }) => type === 4)
          .map((channel) => {
            const childChannels = selectedGuildChannels.filter(
              ({ parent_id, type }) => parent_id === channel.id && type === 0,
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
    </FormControl>
  )
}

export default ChannelSelector
