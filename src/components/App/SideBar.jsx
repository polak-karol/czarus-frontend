import React from 'react'
import { Box, Divider, IconButton, useTheme } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Stack } from '@mui/system'
import SideBarMenuListSegment from './SideBarMenuListSegment'
import SideBarSelectedGuildSegment from './SideBarSelectedGuildSegment'
import { basicPaths, restPaths } from './config'
import { Drawer, DrawerHeader, isSideBarHidden } from './utils'

const SideBar = ({ open, setOpen }) => {
  const theme = useTheme()

  if (isSideBarHidden()) return null

  return (
    <Drawer variant="permanent" open={open}>
      <Stack direction="column" justifyContent="space-between" sx={{ minHeight: '100%' }}>
        <Box>
          <DrawerHeader>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <SideBarMenuListSegment open={open} paths={basicPaths} />
          <Divider />
          <SideBarMenuListSegment open={open} paths={restPaths} />
        </Box>
        <SideBarSelectedGuildSegment open={open} />
      </Stack>
    </Drawer>
  )
}

export default SideBar
