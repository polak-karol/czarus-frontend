import React from 'react'
import { useParams } from 'react-router-dom'
import Page from '~/components/Page'
import Answers from './Answers'
import Birthdays from './Birthdays'
import Challenges from './Challenges'
import Holidays from './Holidays'
import { subPageTitles } from './config'

const Subsetting = () => {
  const { optionName } = useParams()

  const options = {
    answers: <Answers />,
    birthdays: <Birthdays />,
    challenges: <Challenges />,
    holidays: <Holidays />,
  }

  return <Page title={subPageTitles[optionName]}>{options[optionName]}</Page>
}

export default Subsetting
