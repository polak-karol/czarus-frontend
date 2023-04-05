import { DRAW_CHALLANGES_CATEGORY_SUFFIX } from './config'

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
  copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`] = Object.fromEntries(
    Object.entries(copyDrawConfigs[`${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`]).map(
      ([key, value]) => {
        if (key !== drawConfigItemKey) return [key, value]

        return [editCategoryNameInput, value]
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
