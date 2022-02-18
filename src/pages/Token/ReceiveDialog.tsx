import ReceiveForm from '@/components/ReceiveForm'
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { ReceiveTokenDataItem } from './ReceiveTokenTable'
import React, { useMemo } from 'react'
import { shortenAddress } from '@/utils'
import { DEFAULT_RECEIVE_AMOUNT } from './Receive'

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
      <DialogTitle>Receive</DialogTitle>

      <DialogContent>
        <Box>
          <Typography component="div" variant="body1">
            Receive Token: <strong>{symbol}</strong> ({address && shortenAddress(address)})
          </Typography>
          <Typography component="div" variant="body1">
            Receive Amount: {DEFAULT_RECEIVE_AMOUNT}
          </Typography>
          <ReceiveForm onSubmit={onSubmit} />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
