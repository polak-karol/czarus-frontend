import React from 'react'
import Page from '~/components/Page'
import Main from './Main'
import Features from './Featueres'
import Free from './Free'
import RequestFeature from './RequestFeature'

const Landing = () => (
  <Page>
    <Main />
    <Features />
    <RequestFeature />
    <Free />
  </Page>
)

export default Landing
