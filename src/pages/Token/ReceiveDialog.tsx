import ReceiveForm from '@/components/ReceiveForm'
import { Box, Chip, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import { FaucetDataItem } from './ReceiveTokenTable'
import { Trans } from '@lingui/macro'
import React, { useMemo } from 'react'

export default function ReceiveDialog({
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
  const { symbol, address, chain_id } = useMemo(() => row, [row]) || {}

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Typography variant={'h5'}>
            <Trans>Receive</Trans> {symbol}
          </Typography>
          <Chip label={chain_id} color="primary" />
        </Stack>
      </DialogTitle>

      <DialogContent
        sx={{
          minWidth: ['300px', '420px'],
        }}
      >
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
