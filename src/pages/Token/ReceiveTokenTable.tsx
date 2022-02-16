import EmptyList from '@/components/EmptyList'
import { getComparator, Order } from '@/utils/sort'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import React, { useCallback, useState, useMemo } from 'react'
import MoreMenu from './ReceiveTokenMoreMenu'

export type ReceiveTokenDataItem = {
  id: number
  chain_id: number
  address: string
  symbol: string
  left_amount: string
  admin: string
}

export type HeadCell = {
  disablePadding: boolean
  id: keyof ReceiveTokenDataItem
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'id',
  },
  {
    id: 'chain_id',
    numeric: true,
    disablePadding: false,
    label: 'chain_id',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'address',
  },
  {
    id: 'symbol',
    numeric: false,
    disablePadding: false,
    label: 'symbol',
  },
  {
    id: 'left_amount',
    numeric: false,
    disablePadding: false,
    label: 'left_amount',
  },
  {
    id: 'admin',
    numeric: false,
    disablePadding: false,
    label: 'admin',
  },
]

type MyTableHeaderProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ReceiveTokenDataItem) => void
  order: Order
  orderBy: string
}

function MyTableHead({ order, orderBy, onRequestSort }: MyTableHeaderProps) {
  const createSortHandler = (property: keyof ReceiveTokenDataItem) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

type ReceiveTokenTableProps = {
  dataList?: ReceiveTokenDataItem[]
  onReceiveClick?: (row: ReceiveTokenDataItem) => void
}

export default function ReceiveTokenTable({ dataList: rows, onReceiveClick }: ReceiveTokenTableProps) {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof ReceiveTokenDataItem>('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof ReceiveTokenDataItem) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    },
    [order, orderBy]
  )

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }, [])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(() => {
    if (!rows || !rows.length) return 0

    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0
  }, [page, rows, rowsPerPage])

  const isEmptyList = useMemo(() => {
    if (!rows) return true

    return rows.length === 0
  }, [rows])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <MyTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `my-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={() => onReceiveClick && onReceiveClick(row)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.chain_id}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">{row.symbol}</TableCell>
                      <TableCell align="left">{row.left_amount}</TableCell>
                      <TableCell align="left">{row.admin}</TableCell>
                      <TableCell align="right">
                        <MoreMenu onReceiveClick={() => onReceiveClick && onReceiveClick(row)} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isEmptyList && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <EmptyList />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
