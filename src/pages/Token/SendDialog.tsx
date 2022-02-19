import SendTokenForm from '@/components/SendTokenForm'
import { Dialog, DialogContent, DialogTitle, Paper, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { ReceiveTokenDataItem } from './ReceiveTokenTable'

export default function CreateDialog({
  open,
  row,
  onClose,
  onSubmit,
}: {
  open: boolean
  row: ReceiveTokenDataItem | undefined
  onClose: () => void
  onSubmit: (values: any) => void
}) {
  const { address, symbol, admin, chain_id } = useMemo(() => row, [row]) || {}

  return (
    <Paper>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Send {symbol}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ maxWidth: '400px' }}>
            Chain id: <strong>{chain_id}</strong>
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: '400px' }}>
            Token: <strong>{address}</strong>
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: '400px' }}>
            Receiver: <strong>{admin}</strong>
          </Typography>
          <SendTokenForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
