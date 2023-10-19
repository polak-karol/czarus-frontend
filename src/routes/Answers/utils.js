import { ANSWERS_CATEGORY_SUFFIX } from './config'

export const filterAnswers = (data) =>
  Object.entries({ ...data })
    .filter(([key]) => key.endsWith(ANSWERS_CATEGORY_SUFFIX))
    .map(([key, value]) => {
      if (!value) return [key, value]

      return [key, [...value]]
    })
