import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import CardScrollList from '~/components/CardScrollList'
import AgreementModal from '~/components/AgreementModal'
import EditCategoryModal from './EditCategoryModal'
import CardActions from './CardActions'
import SubItem from './SubItem'
import { DRAW_CHALLANGES_CATEGORY_SUFFIX } from './config'
import {
  getBodyForDeleteCategoryAction,
  getBodyForSaveCategoryAction,
  getDrawConfigsWithNewSubItem,
} from './utils'

const Card = ({
  drawConfigItemKey,
  setDrawConfigs,
  drawConfigs,
  updateDrawConfigs,
  setFilteredDrawConfigs,
  filteredDrawConfigs,
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
  const [editCategoryModalActive, setEditCategoryModalActive] = useState(false)
  const [editCategoryNameInput, setEditCategoryNameInput] = useState(drawConfigItemKey)
  const { tab } = useParams()
  const drawConfigKey = `${tab}${DRAW_CHALLANGES_CATEGORY_SUFFIX}`

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
        Actions={
          <CardActions
            disabledSaveActions={!saveActionsAllowed}
            cancelAction={() => setCancelCategoryChangesAgreementModalActive(true)}
            saveAction={() => setSaveCategoryChangesAgreementModalActive(true)}
            addAction={() => {
              setFilteredDrawConfigs((state) =>
                getDrawConfigsWithNewSubItem(state, drawConfigKey, drawConfigItemKey),
              )
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
          updateDrawConfigs(getBodyForDeleteCategoryAction(drawConfigs, tab, drawConfigItemKey))
          setDeleteCategoryAgreementModalActive(false)
        }}
      />
      <AgreementModal
        open={cancelCategoryChangesAgreementModalActive}
        onClose={() => setCancelCategoryChangesAgreementModalActive(false)}
        agreeAction={() => {
          setFilteredDrawConfigs(
            Object.entries({ ...drawConfigs }).filter(
              ([drawConfigsKey, drawConfigsValue]) =>
                !!drawConfigsValue && drawConfigsKey.endsWith(DRAW_CHALLANGES_CATEGORY_SUFFIX),
            ),
          )
          setCancelCategoryChangesAgreementModalActive(false)
        }}
      />
      <AgreementModal
        open={saveCategoryChangesAgreementModalActive}
        onClose={() => setSaveCategoryChangesAgreementModalActive(false)}
        agreeAction={() => {
          updateDrawConfigs(
            getBodyForSaveCategoryAction(
              drawConfigs,
              drawConfigKey,
              drawConfigItemKey,
              filteredDrawConfigs,
            ),
          )
          setSaveCategoryChangesAgreementModalActive(false)
        }}
      />
      <EditCategoryModal
        open={editCategoryModalActive}
        onClose={() => setEditCategoryModalActive(false)}
        setDrawConfigs={setDrawConfigs}
        drawConfigs={drawConfigs}
        editCategoryNameInput={editCategoryNameInput}
        setEditCategoryNameInput={setEditCategoryNameInput}
        drawConfigItemKey={drawConfigItemKey}
      />
    </Grid>
  )
}

export default Card
