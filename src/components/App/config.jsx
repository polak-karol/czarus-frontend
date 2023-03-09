import React from 'react'
import {
  CakeRounded,
  CalendarMonthRounded,
  ChatRounded,
  EmailRounded,
  SettingsRounded,
  HomeRounded,
  EmojiEventsRounded,
  HelpOutlineRounded,
} from '@mui/icons-material'

export const basicPaths = [
  { name: 'Dashboard', url: '/', icon: <HomeRounded /> },
  { name: 'Birthdays', url: '/birthdays', icon: <CakeRounded /> },
  { name: 'Draw challanges', url: '/draw-challanges', icon: <EmojiEventsRounded /> },
  { name: 'Holidays', url: '/holidays', icon: <CalendarMonthRounded /> },
  { name: 'Answers', url: '/answers', icon: <ChatRounded /> },
]

export const restPaths = [
  { name: 'Settings', url: '/settings', icon: <SettingsRounded /> },
  { name: 'Help', url: '/help', icon: <HelpOutlineRounded /> },
  { name: 'Contact', url: '/contact', icon: <EmailRounded /> },
]

export const drawerWidth = 240
