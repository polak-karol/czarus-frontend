import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import CardScrollList from '~/components/CardScrollList'
import CardActions from './CardActions'
import SubItem from './SubItem'
import CardHeaderActions from './CardHeaderActions'
import AgreementModal from '~/components/AgreementModal'

const Card = ({
  drawConfigItemKey,
  drawConfigs,
  updateDrawConfigs,
  setFilteredDrawConfigs,
  filteredDrawConfigs,
  drawConfigKey,
  setSelectedDrawConfigIndex,
  setSelectedDrawConfigType,
  setSelectedDrawConfigInput,
  drawConfigItemValue,
  selectedDrawConfigIndex,
  selectedDrawConfigType,
  selectedDrawConfigInput,
}) => {
  const [saveActionsAllowed, setSaveActionsAllowed] = useState(false)
  const [deleteCategoryAgreementModalActive, setDeleteCategoryAgreementModalActive] =
    useState(false)
  const [saveCategoryChangesAgreementModalActive, setSaveCategoryChangesAgreementModalActive] =
    useState(false)
  const [cancelCategoryChangesAgreementModalActive, setCancelCategoryChangesAgreementModalActive] =
    useState(false)
  const { tab } = useParams()

  useEffect(() => {
    if (
      JSON.stringify(drawConfigs[drawConfigKey][drawConfigItemKey]) !==
      JSON.stringify(Object.fromEntries(filteredDrawConfigs)[drawConfigKey][drawConfigItemKey])
    ) {
      setSaveActionsAllowed(true)
    } else {
      setSaveActionsAllowed(false)
    }
  }, [
    JSON.stringify(drawConfigs[drawConfigKey][drawConfigItemKey]),
    JSON.stringify(Object.fromEntries(filteredDrawConfigs)[drawConfigKey][drawConfigItemKey]),
  ])

  return (
    <Grid item xs={6}>
      <CardScrollList
        title={drawConfigItemKey}
        listConfig={{
          itemData: {
            resources: drawConfigItemValue,
            resourcesKey: drawConfigItemKey,
            drawConfigKey,
            setFilteredDrawConfigs,
            selectedDrawConfigIndex,
            setSelectedDrawConfigIndex,
            selectedDrawConfigType,
            setSelectedDrawConfigType,
            selectedDrawConfigInput,
            setSelectedDrawConfigInput,
          },
          height: 300,
          itemSize: 46,
          itemCount: drawConfigItemValue.length,
          overscanCount: 5,
        }}
        Item={SubItem}
        CardHeaderActions={
          <CardHeaderActions
            editAction={() => {}}
            deleteAction={() => setDeleteCategoryAgreementModalActive(true)}
          />
        }
        Actions={
          <CardActions
            disabledSaveActions={!saveActionsAllowed}
            cancelAction={() => setCancelCategoryChangesAgreementModalActive(true)}
            saveAction={() => setSaveCategoryChangesAgreementModalActive(true)}
            addAction={() => {
              setFilteredDrawConfigs((state) => {
                const copyState = [...state]
                copyState.map(([key, value]) => {
                  if (key !== drawConfigKey) return [key, value]
                  value[drawConfigItemKey].unshift('')
                  return [key, value]
                })
                return copyState
              })
              setSelectedDrawConfigIndex(0)
              setSelectedDrawConfigType(drawConfigItemKey)
              setSelectedDrawConfigInput('')
            }}
            disabledAddAction={selectedDrawConfigType === drawConfigItemKey}
          />
        }
      />
      <AgreementModal
        open={deleteCategoryAgreementModalActive}
        onClose={() => setDeleteCategoryAgreementModalActive(false)}
        agreeAction={() => {
          const copyDrawConfigs = { ...drawConfigs }
          delete copyDrawConfigs[`${tab}Config`][drawConfigItemKey]
          updateDrawConfigs(copyDrawConfigs)
        }}
      />
      <AgreementModal
        open={cancelCategoryChangesAgreementModalActive}
        onClose={() => setCancelCategoryChangesAgreementModalActive(false)}
        agreeAction={() =>
          setFilteredDrawConfigs(
            Object.entries({ ...drawConfigs }).filter(
              ([drawConfigsKey, drawConfigsValue]) =>
                !!drawConfigsValue && drawConfigsKey.endsWith('Config'),
            ),
          )
        }
      />
      <AgreementModal
        open={saveCategoryChangesAgreementModalActive}
        onClose={() => setSaveCategoryChangesAgreementModalActive(false)}
        agreeAction={() => {
          const body = { ...drawConfigs }
          body[drawConfigKey][drawConfigItemKey] = filteredDrawConfigs.find(
            ([key]) => key === drawConfigKey,
          )[1][drawConfigItemKey]
          updateDrawConfigs(body)
        }}
      />
    </Grid>
  )
}

export default Card
