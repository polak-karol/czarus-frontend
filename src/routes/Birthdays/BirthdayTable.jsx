import React, { useState } from 'react'
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  IconButton,
} from '@mui/material'
import {
  DeleteRounded as DeleteRoundedIcon,
  EditRounded as EditRoundedIcon,
} from '@mui/icons-material'
import { columns } from './config'
import { createData } from './utils'
import BirthdayDeleteModal from './BirthdayDeleteModal'
import BirthdayEditModal from './BirthdayEditModal'

const BirthdaysTable = ({
  birthdaysList,
  setBirthdaysList,
  refreshBirthdayList,
  setRefreshBirthdayList,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [birthdayDeleteModalOpen, setBirthdayDeleteModalClose] = useState(false)
  const [birthdayEditModalOpen, setBirthdayEditModalClose] = useState(false)
  const [selectedBirthday, setSelectedBirthday] = useState({})

  const handleChangePage = (_, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {birthdaysList
              .map((birthday) =>
                createData(
                  birthday.id,
                  birthday.date,
                  birthday.userId,
                  birthday.isAnonymous,
                  birthday.createdAt,
                  birthday.updatedAt,
                  <>
                    <IconButton
                      onClick={() => {
                        setSelectedBirthday(birthday)
                        setBirthdayEditModalClose(!birthdayEditModalOpen)
                      }}
                      aria-label="delete"
                      size="small"
                      color="primary"
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedBirthday(birthday)
                        setBirthdayDeleteModalClose(!birthdayDeleteModalOpen)
                      }}
                      aria-label="delete"
                      size="small"
                      color="error"
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </>,
                ),
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={birthdaysList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <BirthdayDeleteModal
        open={birthdayDeleteModalOpen}
        onClose={() => setBirthdayDeleteModalClose(false)}
        selectedBirthday={selectedBirthday}
        setBirthdaysList={setBirthdaysList}
      />
      <BirthdayEditModal
        open={birthdayEditModalOpen}
        selectedBirthday={selectedBirthday}
        onClose={() => setBirthdayEditModalClose(false)}
        setRefreshBirthdayList={setRefreshBirthdayList}
        refreshBirthdayList={refreshBirthdayList}
      />
    </Paper>
  )
}

export default BirthdaysTable
