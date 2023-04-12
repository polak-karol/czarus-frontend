import React from 'react'
import { Divider, IconButton, useTheme } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import MenuListSegment from './MenuListSegment'
import { basicPaths, restPaths } from './config'
import { Drawer, DrawerHeader, isSideBarHidden } from './utils'

const SideBar = ({ open, setOpen }) => {
  const theme = useTheme()

  if (isSideBarHidden()) return null

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={() => setOpen(false)}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <MenuListSegment open={open} paths={basicPaths} />
      <Divider />
      <MenuListSegment open={open} paths={restPaths} />
    </Drawer>
  )
}

export default SideBar
