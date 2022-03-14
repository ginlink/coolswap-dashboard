import { FaucetDataItem } from '@/pages/Token/ReceiveTokenTable'
import { Chip, Dialog, DialogContent, DialogTitle, Paper, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import DeleteTokenForm from './DelteTokenForm'

export default function DeleteDialog({
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
  const { symbol, chain_id } = useMemo(() => row, [row]) || {}

  return (
    <Paper>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant={'h5'}>Delete {symbol}</Typography>
            <Chip label={chain_id} color="primary" />
          </Stack>
        </DialogTitle>
        <DialogContent>
          {/* <Typography variant="body1">
            Delete Token: <strong>{symbol}</strong> ({address && shortenAddress(address)})
          </Typography> */}

          <Typography variant="subtitle2">Enter private key for verifying</Typography>

          <DeleteTokenForm onSubmit={onSubmit} />

          <Typography variant="subtitle2" sx={{ maxWidth: '400px', mt: 2 }}>
            Notice: Please use the private key of the test account. Otherwise there is a risk that the funds will be
            stolen!
          </Typography>
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
