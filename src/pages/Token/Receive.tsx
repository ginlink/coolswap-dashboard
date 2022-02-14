import ReceiveForm from '@/components/ReceiveForm'
import { receiveTokenApi, tokenListApi, TokenListItem } from '@/services/api'
import { Box, Modal, Paper, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowParams, GridRowsProp } from '@mui/x-data-grid'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div``
const StyledPaper = styled(Paper)`
  padding: 20px;
`
const columns: GridColDef[] = [
  { field: 'id', headerName: 'id' },
  { field: 'chain_id', headerName: 'chain id' },
  { field: 'address', headerName: 'address', width: 400 },
  { field: 'symbol', headerName: 'symbol' },
  { field: 'left_amount', headerName: 'left amount', width: 200 },
  { field: 'admin', headerName: 'admin', width: 400 },
]

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

export default function ReceiveToken() {
  const [rows, setRows] = useState<GridRowsProp>([])
  const [open, setOpen] = useState(false)
  const [tokenAddress, setTokenAddress] = useState<string | undefined>()

  const onRowClickHandler = useCallback((params: GridRowParams) => {
    const { row } = params as unknown as { row: TokenListItem }
    const { address } = row

    setTokenAddress(address)
    setOpen(true)
  }, [])

  const onSubmitHandler = useCallback(
    async (values) => {
      try {
        if (!tokenAddress) return

        const { address: receive } = values
        const token_address = tokenAddress
        const amount = '10000'

        await receiveTokenApi(receive, token_address, amount)
        setOpen(false)
      } catch (err) {
        console.log('[err]:', err)
        throw err
      }
    },
    [tokenAddress]
  )

  useEffect(() => {
    tokenListApi()
      .then((res) => {
        console.log('[res]:', res)
        setRows(res)
      })
      .catch((err) => {
        console.log('[err]:', err)
      })
  }, [])

  return (
    <Wrapper>
      <StyledPaper elevation={0}>
        <Stack direction="row" spacing={2}>
          Receive Header
        </Stack>
      </StyledPaper>

      <StyledPaper elevation={0} sx={{ marginTop: '10px' }}>
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows ?? []} columns={columns} onRowClick={onRowClickHandler} />
        </div>
      </StyledPaper>

      <Modal
        open={open}
        onClose={() => setOpen((prev) => !prev)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ReceiveForm onSubmit={onSubmitHandler} />
        </Box>
      </Modal>
    </Wrapper>
  )
}
