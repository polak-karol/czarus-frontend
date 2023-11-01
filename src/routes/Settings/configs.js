import {
  CakeRounded,
  CalendarMonthRounded,
  ChatRounded,
  SettingsRounded,
  EmojiEventsRounded,
} from '@mui/icons-material'

export const settingsConfig = [
  {
    title: 'General',
    content:
      "Customize your bot's basic config and set the language to make it feel right at home on your server.",
    icon: SettingsRounded,
    url: '/settings/general',
  },
  {
    title: 'Birthdays',
    content:
      'Personalize birthday messages with custom templates and choose the timing for reminders.',
    icon: CakeRounded,
    url: '/settings/birthdays',
  },
  {
    title: 'Challenges',
    content: 'Define challenge categories for unique experiences.',
    icon: EmojiEventsRounded,
    url: '/settings/challenges',
  },
  {
    title: 'Holidays',
    content:
      'Create and schedule custom holidays with unique names and descriptions for special server events.',
    icon: CalendarMonthRounded,
    url: '/settings/holidays',
  },
  {
    title: 'Answers',
    content: 'Train your bot to respond to specific keywords or phrases with custom replies.',
    icon: ChatRounded,
    url: '/settings/answers',
  },
]
