import React, { useEffect, useState } from 'react'
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
} from '@mui/material'
import agent from '../../api/agent'
import { columns, rows } from './config'
import { createData } from './utils'

const BirthdaysTable = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [birthdaysList, setBirthdaysList] = useState([])

  const handleChangePage = (_, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getBirthdaysSuccess = (response) => {
    setBirthdaysList(response.data)
  }

  const getBirthdaysError = (error) => {
    console.log(error)
  }

  const getBirthdays = () =>
    agent.Birthdays.getBirthdays('guild_id').then(getBirthdaysSuccess, getBirthdaysError)

  useEffect(() => {
    getBirthdays()
  }, [])

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
              .map(({ id, date, userId, isAnonymous }) =>
                createData(id, date, userId, isAnonymous, 'Edit Delete'),
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default BirthdaysTable
