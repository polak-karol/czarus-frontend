import React from 'react'
import {
  AppBar,
  Button,
  Card,
  Stack,
  CardActions,
  CardContent,
  Dialog,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'

const ModifyWishesModal = ({ active, onClose }) => (
  <Dialog fullScreen open={active} onClose={onClose}>
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
        <Stack flexDirection="row" alignItems="center" gap={2} sx={{ ml: 2, flex: 1 }}>
          <Typography variant="h6" component="div">
            Plural wishes
          </Typography>
          <Button autoFocus color="primary" onClick={onClose}>
            Add
          </Button>
        </Stack>
        <Button autoFocus color="inherit" onClick={onClose}>
          save
        </Button>
      </Toolbar>
    </AppBar>
    <Grid padding={5} gap={3} container>
      <Grid xs={2.85} item>
        <Card>
          <CardContent>Text</CardContent>
          <CardActions>
            <Button color="error" size="small">
              Delete
            </Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid xs={2.85} item>
        <Card>
          <CardContent>Text</CardContent>
          <CardActions>
            <Button color="error" size="small">
              Delete
            </Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid xs={2.85} item>
        <Card>
          <CardContent>Text</CardContent>
          <CardActions>
            <Button color="error" size="small">
              Delete
            </Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid xs={2.85} item>
        <Card>
          <CardContent>Text</CardContent>
          <CardActions>
            <Button color="error" size="small">
              Delete
            </Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </Dialog>
)

export default ModifyWishesModal
