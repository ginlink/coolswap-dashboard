import EmptyList from '@/components/EmptyList'
import { TokenListItem } from '@/services/token'
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
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import MoreMenuToken, { ActionStateToken } from './MoreMenuToken'
import { t, Trans } from '@lingui/macro'
import React, { useCallback, useState, useMemo, ReactNode } from 'react'

export type TokenDataItem = Omit<TokenListItem, 'created_at' | 'updated_at'>

export type HeadCell = {
  disablePadding: boolean
  id: keyof TokenDataItem
  label: ReactNode
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: `Id`,
  },
  {
    id: 'chain_id',
    numeric: true,
    disablePadding: false,
    label: <Trans>Chain</Trans>,
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: <Trans>Address</Trans>,
  },
  {
    id: 'decimals',
    numeric: false,
    disablePadding: false,
    label: <Trans>Decimals</Trans>,
  },
  {
    id: 'symbol',
    numeric: false,
    disablePadding: false,
    label: <Trans>Symbol</Trans>,
  },
  {
    id: 'total',
    numeric: false,
    disablePadding: false,
    label: <Trans>Amount</Trans>,
  },
  {
    id: 'creator',
    numeric: false,
    disablePadding: false,
    label: <Trans>Creator</Trans>,
  },
]

type MyTableHeaderProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TokenDataItem) => void
  order: Order
  orderBy: string
}

function MyTableHead({ order, orderBy, onRequestSort }: MyTableHeaderProps) {
  const createSortHandler = (property: keyof TokenDataItem) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell key={'action'} align={'left'} padding={'normal'}>
          <Trans>Action</Trans>
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
  dataList?: TokenDataItem[]
  onAction?: (e: any, state: ActionStateToken, row: TokenDataItem) => void
}

export default function ReceiveTokenTable({ dataList: rows, onAction }: ReceiveTokenTableProps) {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof TokenDataItem>('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof TokenDataItem) => {
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
                    <TableCell align="left">
                      <MoreMenuToken onAction={(e, state) => onAction && onAction(e, state, row)} />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">
                      <Chip color={'primary'} label={row.chain_id} />
                    </TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">
                      <Chip color={'warning'} label={row.decimals} />
                    </TableCell>
                    <TableCell align="left">
                      <Chip color={'info'} label={row.symbol} />
                    </TableCell>
                    <TableCell align="left" sx={{ color: 'success.dark' }}>
                      {computeNumUnitAdapter(row.total)}
                    </TableCell>
                    <TableCell align="left">{row.creator}</TableCell>
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
        rowsPerPageOptions={[15, 25, 50]}
        component="div"
        count={rows?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage={<Trans>Rows per page:</Trans>}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
