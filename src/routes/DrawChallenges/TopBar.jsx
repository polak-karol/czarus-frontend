import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Paper, Tab, Tabs } from '@mui/material'
import { DRAW_CHALLENGES_ROUTES } from '~/utils/config'

const TopBar = () => {
  const { pathname } = useLocation()

  return (
    <Paper>
      <Tabs value={pathname}>
        {DRAW_CHALLENGES_ROUTES.map(({ label, url }) => (
          <Tab key={url} component={Link} value={url} to={url} label={label} />
        ))}
      </Tabs>
    </Paper>
  )
}

export default TopBar
