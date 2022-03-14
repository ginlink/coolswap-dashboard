import SendTokenForm from '@/components/SendTokenForm'
import { Chip, Dialog, DialogContent, DialogTitle, Paper, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { FaucetDataItem } from './ReceiveTokenTable'

export default function CreateDialog({
  open,
  row,
  onClose,
  onSubmit,
}: {
  open: boolean
  row: FaucetDataItem | undefined
  onClose: () => void
  onSubmit: (values: any) => void
}) {
  const { address, symbol, admin, chain_id } = useMemo(() => row, [row]) || {}

  return (
    <Paper>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant={'h5'}>Send {symbol}</Typography>
            <Chip label={chain_id} color="primary" />
          </Stack>
        </DialogTitle>
        <DialogContent>
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
