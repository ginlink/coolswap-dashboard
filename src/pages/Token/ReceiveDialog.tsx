import ReceiveForm from '@/components/ReceiveForm'
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { ReceiveTokenDataItem } from './ReceiveTokenTable'
import React, { useMemo } from 'react'

export default function ReceiveDialog({
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
  const { symbol, address } = useMemo(() => row, [row]) || {}

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Receive {symbol}</DialogTitle>

      <DialogContent>
        <Box>
          <Typography component="div" variant="body1">
            Token: <strong>{address}</strong>
          </Typography>
          <ReceiveForm onSubmit={onSubmit} />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
