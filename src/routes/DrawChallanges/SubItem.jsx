import React from 'react'
import { ListItem } from '@mui/material'
import SubItemContent from './SubItemContent'
import SecondaryActionEdit from './SecondaryActionEdit'
import SecondaryActionDefault from './SecondaryActionDefault'
import {
  getCleanedFilteredDrawConfigs,
  getFilteredDrawConfigsWithNewItemName,
  getFilteredDrawConfigsWithoutDeletedItem,
  isEditMode,
} from './utils'

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
              getFilteredDrawConfigsWithNewItemName(
                state,
                drawConfigKey,
                resourcesKey,
                resources[index],
                selectedDrawConfigInput,
              ),
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
            setFilteredDrawConfigs((state) =>
              getCleanedFilteredDrawConfigs(state, drawConfigKey, resourcesKey),
            )
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
              getFilteredDrawConfigsWithoutDeletedItem(
                state,
                drawConfigKey,
                resourcesKey,
                resources[index],
              ),
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
