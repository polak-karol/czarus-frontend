import React from 'react'
import { useParams } from 'react-router-dom'
import Page from '~/components/Page'
import Answers from './Answers'

const Subsetting = () => {
  const { optionName } = useParams()

  const options = {
    answers: <Answers />,
  }

  return <Page title={optionName}>{options[optionName]}</Page>
}

export default Subsetting
