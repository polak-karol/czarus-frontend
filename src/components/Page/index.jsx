import React from 'react'
import _ from 'lodash'
import { Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material'
import Footer from '../Footer'

const Page = ({ title, children, actions, breadcrumbs = [] }) => {
  const previousPages = breadcrumbs
  const currentPage = breadcrumbs.at(-1)

  return (
    <>
      <Container sx={{ minHeight: '100vh' }} fixed>
        <Stack spacing={4}>
          {!_.isEmpty(breadcrumbs) && (
            <Breadcrumbs aria-label="breadcrumb">
              {previousPages.map((previousPage) => (
                <Link underline="hover" color="inherit" href={previousPage.url}>
                  {previousPage.name}
                </Link>
              ))}
              <Typography color="text.primary">{currentPage.name}</Typography>
            </Breadcrumbs>
          )}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" component="h3">
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
