import * as React from 'react'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { Box, Toolbar, CssBaseline, Typography, Divider, IconButton } from '@mui/material'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material'
import { basicPaths, restPaths } from './config'
import { AppBar, Drawer, DrawerHeader } from './utils'
import MenuListSegment from './MenuListSegment'

const App = ({ children }) => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Czaruś
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <MenuListSegment open={open} paths={basicPaths} />
          <Divider />
          <MenuListSegment open={open} paths={restPaths} />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
