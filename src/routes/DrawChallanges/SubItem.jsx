import React from 'react'
import { ListItem } from '@mui/material'
import SubItemContent from './SubItemContent'
import SecondaryActionDefault from './SecondaryActionDefault'
import { isEditMode } from './utils'
import SecondaryActionEdit from './SecondaryActionEdit'

const SubItem = ({
  index,
  style,
  data: {
    resources,
    setFilteredDrawConfigs,
    drawConfigKey,
    resourcesKey,
    selectedDrawConfigIndex,
    setSelectedDrawConfigIndex,
    selectedDrawConfigType,
    setSelectedDrawConfigType,
    selectedDrawConfigInput,
    setSelectedDrawConfigInput,
  },
}) => (
  <ListItem
    style={style}
    key={index}
    secondaryAction={
      isEditMode(selectedDrawConfigIndex, selectedDrawConfigType, index, resourcesKey) ? (
        <SecondaryActionEdit
          saveAction={() => {
            setFilteredDrawConfigs((state) =>
              state.map(([key, value]) => {
                if (key !== drawConfigKey) return [key, value]

                return [
                  key,
                  Object.fromEntries(
                    Object.entries(value).map(([itemKey, itemValue]) => {
                      if (itemKey !== resourcesKey) return [itemKey, itemValue]
                      return [
                        itemKey,
                        itemValue.map((element) => {
                          if (element !== resources[index]) return element

                          return selectedDrawConfigInput
                        }),
                      ]
                    }),
                  ),
                ]
              }),
            )
            setSelectedDrawConfigIndex(null)
            setSelectedDrawConfigType(null)
            setSelectedDrawConfigInput(null)
          }}
          disabledSaveAction={!selectedDrawConfigInput}
          cancelAction={() => {
            setSelectedDrawConfigIndex(null)
            setSelectedDrawConfigType(null)
            setSelectedDrawConfigInput(null)
          }}
        />
      ) : (
        <SecondaryActionDefault
          editAction={() => {
            setSelectedDrawConfigIndex(index)
            setSelectedDrawConfigType(resourcesKey)
            setSelectedDrawConfigInput(resources[index])
          }}
          deleteAction={() => {
            setFilteredDrawConfigs((state) =>
              state.map(([key, value]) => {
                if (key !== drawConfigKey) return [key, value]

                return [
                  key,
                  Object.fromEntries(
                    Object.entries(value).map(([itemKey, itemValue]) => {
                      if (itemKey !== resourcesKey) return [itemKey, itemValue]
                      return [itemKey, itemValue.filter((element) => element !== resources[index])]
                    }),
                  ),
                ]
              }),
            )
          }}
        />
      )
    }
  >
    <SubItemContent
      selectedDrawConfigInput={selectedDrawConfigInput}
      setSelectedDrawConfigInput={setSelectedDrawConfigInput}
      editMode={isEditMode(selectedDrawConfigIndex, selectedDrawConfigType, index, resourcesKey)}
      resources={resources}
      index={index}
    />
  </ListItem>
)

export default SubItem
