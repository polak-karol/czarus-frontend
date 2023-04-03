import React from 'react'
import { ListItem } from '@mui/material'
import SubItemContent from './SubItemContent'
import SecondaryActionDefault from './SecondaryActionDefault'

const SubItem = ({
  index,
  style,
  data: { resources, setFilteredDrawConfigs, drawConfigKey, resourcesKey },
}) => (
  <ListItem
    style={style}
    key={index}
    secondaryAction={
      <SecondaryActionDefault
        editAction={() => {}}
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
    <SubItemContent resource={resources[index]} />
  </ListItem>
)

export default SubItem
