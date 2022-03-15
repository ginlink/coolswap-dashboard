import EmptyList from '@/components/EmptyList'
import { computeNumUnitAdapter } from '@/utils/formatNum'
import { getComparator, Order } from '@/utils/sort'
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import React, { useCallback, useState, useMemo } from 'react'
import MoreMenu, { ActionState } from './ReceiveTokenMoreMenu'

export type FaucetDataItem = {
  id: number
  chain_id: number
  address: string
  symbol: string
  left_amount: string
  left_native: string
  admin: string
}

export type HeadCell = {
  disablePadding: boolean
  id: keyof FaucetDataItem
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
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
    id: 'left_native',
    numeric: false,
    disablePadding: false,
    label: 'left_native',
  },
  {
    id: 'admin',
    numeric: false,
    disablePadding: false,
    label: 'admin',
  },
]

type MyTableHeaderProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof FaucetDataItem) => void
  order: Order
  orderBy: string
}

function MyTableHead({ order, orderBy, onRequestSort }: MyTableHeaderProps) {
  const createSortHandler = (property: keyof FaucetDataItem) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell key={'action'} align={'left'} padding={'normal'}>
          Action
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
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
  dataList?: FaucetDataItem[]
  onAction?: (e: any, state: ActionState, row: FaucetDataItem) => void
}

export default function ReceiveTokenTable({ dataList: rows, onAction }: ReceiveTokenTableProps) {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof FaucetDataItem>('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof FaucetDataItem) => {
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
    <>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="right">
                      <MoreMenu onAction={(e, state) => onAction && onAction(e, state, row)} />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">
                      <Chip color={'primary'} label={row.chain_id} />
                    </TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">
                      <Chip color={'info'} label={row.symbol} />
                    </TableCell>
                    <TableCell align="left">
                      <Typography color="success.dark">{computeNumUnitAdapter(row.left_amount)}</Typography>
                    </TableCell>
                    <TableCell align="left">{computeNumUnitAdapter(row.left_native)}</TableCell>
                    <TableCell align="left">{row.admin}</TableCell>
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
    </>
  )
}
