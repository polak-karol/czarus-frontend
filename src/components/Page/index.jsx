import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import _ from 'lodash'
import { Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material'
import Footer from '../Footer'

const Page = ({ title, children, actions, breadcrumbs = [] }) => {
  const [currentPage, ...previousPages] = breadcrumbs.reverse()

  return (
    <>
      <Container sx={{ minHeight: '100vh', paddingTop: '2rem' }} fixed>
        <Stack spacing={4}>
          {!_.isEmpty(breadcrumbs) && (
            <Breadcrumbs aria-label="breadcrumb">
              {previousPages.reverse().map((previousPage) => (
                <Link
                  component={RouterLink}
                  key={previousPage.name}
                  underline="hover"
                  color="inherit"
                  to={previousPage.url}
                >
                  {previousPage.name}
                </Link>
              ))}
              <Typography color="text.primary">{currentPage.name}</Typography>
            </Breadcrumbs>
          )}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h2" component="h2">
              {title}
            </Typography>
            {actions}
          </Stack>
          {children}
        </Stack>
      </Container>
      <Footer />
    </>
  )
}

export default Page
