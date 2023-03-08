import { createData } from './utils'

export const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'userId',
    label: 'User\u00a0id',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'isAnonymous',
    label: 'Anonymous',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
  },
]

export const rows = [createData('India', '2002-04-24', 1324171354, 'false', 'Edit Delete')]
