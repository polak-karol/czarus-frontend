import React from 'react'
import { ListItem } from '@mui/material'
import SubItemContent from './SubItemContent'
import SecondaryActionDefault from './SecondaryActionDefault'

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
    }
  >
    <SubItemContent
      selectedDrawConfigIndex={selectedDrawConfigIndex}
      selectedDrawConfigType={selectedDrawConfigType}
      selectedDrawConfigInput={selectedDrawConfigInput}
      setSelectedDrawConfigInput={setSelectedDrawConfigInput}
      resourcesKey={resourcesKey}
      resources={resources}
      index={index}
    />
  </ListItem>
)

export default SubItem
