import { DRAW_CHALLANGES_CATEGORY_SUFFIX } from './config'

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

          const copyItemValue = { ...itemValue }
          copyItemValue.items = itemValue.items.map((element) => {
            if (element !== resource) return element

            return selectedDrawConfigInput
          })

          return [itemKey, copyItemValue]
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

          const copyItemValue = { ...itemValue }
          copyItemValue.items = copyItemValue.items.filter((element) => element !== resource)

          return [itemKey, copyItemValue]
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
  copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`] = Object.fromEntries(
    Object.entries(copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`]).map(
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
    value[drawConfigItemKey].items.unshift('')
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
  delete copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`][drawConfigItemKey]

  return copyDrawConfigs
}

export const getBodyForAddCategoryAction = (drawConfigs, tab, categoryNameInput) => {
  const copyDrawConfigs = { ...drawConfigs }

  if (!copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`]) {
    copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`] = {}
  }

  copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`][
    convertCategoryNameToDiscordCommandParam(categoryNameInput)
  ] = { items: [], label: categoryNameInput }

  return copyDrawConfigs
}
