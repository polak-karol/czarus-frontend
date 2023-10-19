import { DRAW_CHALLENGES_CATEGORY_SUFFIX } from './config'

export const convertCategoryNameToDiscordCommandParam = (categoryName) =>
  categoryName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replaceAll(' ', '_')

export const isEditMode = (selectedDrawConfigIndex, selectedDrawConfigType, index, resourcesKey) =>
  selectedDrawConfigIndex === index && selectedDrawConfigType === resourcesKey

export const getFilteredDrawConfigsWithNewItemName = (
  state,
  drawConfigKey,
  resourcesKey,
  resource,
  selectedDrawConfigInput,
) => {
  const copyState = [...state]
  return copyState.map(([key, value]) => {
    if (key !== drawConfigKey) return [key, value]

    return [
      key,
      Object.fromEntries(
        Object.entries(value).map(([itemKey, itemValue]) => {
          if (itemKey !== resourcesKey) return [itemKey, itemValue]

          return [
            itemKey,
            itemValue.map((element) => {
              if (element !== resource) return element

              return selectedDrawConfigInput
            }),
          ]
        }),
      ),
    ]
  })
}

export const getCleanedFilteredDrawConfigs = (state, drawConfigKey, resourcesKey) => {
  const copyState = [...state]

  return copyState.map(([key, value]) => {
    if (key !== drawConfigKey) return [key, value]
    const copyValue = { ...value }
    copyValue[resourcesKey] = copyValue[resourcesKey].filter((item) => !!item)
    return [key, copyValue]
  })
}

export const getFilteredDrawConfigsWithoutDeletedItem = (
  state,
  drawConfigKey,
  resourcesKey,
  resource,
) => {
  const copyState = [...state]
  return copyState.map(([key, value]) => {
    if (key !== drawConfigKey) return [key, value]

    return [
      key,
      Object.fromEntries(
        Object.entries(value).map(([itemKey, itemValue]) => {
          if (itemKey !== resourcesKey) return [itemKey, itemValue]

          return [itemKey, itemValue.filter((element) => element !== resource)]
        }),
      ),
    ]
  })
}

export const getDrawConfigsWithChangedSubItemName = (
  drawConfigs,
  tab,
  drawConfigItemKey,
  editCategoryNameInput,
) => {
  const copyDrawConfigs = { ...drawConfigs }
  copyDrawConfigs[`${tab}${DRAW_CHALLENGES_CATEGORY_SUFFIX}`] = Object.fromEntries(
    Object.entries(copyDrawConfigs[`${tab}${DRAW_CHALLENGES_CATEGORY_SUFFIX}`]).map(
      ([key, value]) => {
        if (key !== drawConfigItemKey) return [key, value]
        const copyValue = { ...value }
        copyValue.label = editCategoryNameInput
        return [convertCategoryNameToDiscordCommandParam(editCategoryNameInput), copyValue]
      },
    ),
  )

  return copyDrawConfigs
}

export const getDrawConfigsWithNewSubItem = (state, drawConfigKey, drawConfigItemKey) => {
  const copyState = [...state]
  copyState.map(([key, value]) => {
    if (key !== drawConfigKey) return [key, value]
    value[drawConfigItemKey].unshift('')
    return [key, value]
  })

  return copyState
}

export const getBodyForSaveCategoryAction = (
  drawConfigs,
  drawConfigKey,
  drawConfigItemKey,
  filteredDrawConfigs,
) => {
  const body = { ...drawConfigs }
  body[drawConfigKey][drawConfigItemKey] = filteredDrawConfigs.find(
    ([key]) => key === drawConfigKey,
  )[1][drawConfigItemKey]

  return body
}

export const getBodyForDeleteCategoryAction = (drawConfigs, tab, drawConfigItemKey) => {
  const copyDrawConfigs = { ...drawConfigs }
  delete copyDrawConfigs[`${tab}${DRAW_CHALLENGES_CATEGORY_SUFFIX}`][drawConfigItemKey]

  return copyDrawConfigs
}

export const getBodyForAddCategoryAction = (drawConfigs, tab, categoryNameInput) => {
  const copyDrawConfigs = { ...drawConfigs }

  if (!copyDrawConfigs[`${tab}${DRAW_CHALLENGES_CATEGORY_SUFFIX}`]) {
    copyDrawConfigs[`${tab}${DRAW_CHALLENGES_CATEGORY_SUFFIX}`] = {}
  }

  copyDrawConfigs[`${tab}${DRAW_CHALLENGES_CATEGORY_SUFFIX}`][
    convertCategoryNameToDiscordCommandParam(categoryNameInput)
  ] = { items: [], label: categoryNameInput }

  return copyDrawConfigs
}

export const formatCardTitle = (title) => {
  const [firstLetter, ...rest] = title.replaceAll('_', ' ').split('')
  return [firstLetter.toUpperCase(), ...rest].join('')
}

export const filterDrawChallenges = (data) =>
  Object.entries({ ...data }).filter(([key]) => key.endsWith(DRAW_CHALLENGES_CATEGORY_SUFFIX))
