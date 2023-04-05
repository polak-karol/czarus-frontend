import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import AddNewCategoryModal from './AddNewCategoryModal'

const AddNewCategoryCard = ({ drawConfigs, setDrawConfigs }) => {
  const [addNewCategoryModalActive, setAddNewCategoryModal] = useState(false)

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Create a new category" />
        <CardContent>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography>
              Create as many categories as you want. Just click "Create" button.
            </Typography>
            <Button onClick={() => setAddNewCategoryModal(true)} variant="outlined">
              Create
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <AddNewCategoryModal
        open={addNewCategoryModalActive}
        onClose={() => setAddNewCategoryModal(false)}
        drawConfigs={drawConfigs}
        setDrawConfigs={setDrawConfigs}
      />
    </Grid>
  )
}

export default AddNewCategoryCard
