import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Paper, Tab, Tabs } from '@mui/material'

const TopBar = () => {
  const { pathname } = useLocation()

  return (
    <Paper>
      <Tabs value={pathname}>
        <Tab
          component={Link}
          value="/draw-challanges/writing"
          to="/draw-challanges/writing"
          label="Writing"
        />
        <Tab
          component={Link}
          value="/draw-challanges/painting"
          to="/draw-challanges/painting"
          label="Painting"
        />
        <Tab
          component={Link}
          value="/draw-challanges/music"
          to="/draw-challanges/music"
          label="Music"
        />
      </Tabs>
    </Paper>
  )
}

export default TopBar
