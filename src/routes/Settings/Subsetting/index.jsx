import React from 'react'
import { useParams } from 'react-router-dom'
import Page from '~/components/Page'
import Answers from './Answers'
import Birthdays from './Birthdays'
import Challanges from './Challanges'
import Holidays from './Holidays'

const Subsetting = () => {
  const { optionName } = useParams()

  const options = {
    answers: <Answers />,
    birthdays: <Birthdays />,
    challanges: <Challanges />,
    holidays: <Holidays />,
  }

  return <Page title={optionName}>{options[optionName]}</Page>
}

export default Subsetting
