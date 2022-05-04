import { FaucetDataItem } from '@/pages/Token/ReceiveTokenTable'
import { Chip, Dialog, DialogContent, DialogTitle, Paper, Stack, Typography } from '@mui/material'
import DeleteTokenForm from './DelteTokenForm'
import { t, Trans } from '@lingui/macro'
import React, { useMemo } from 'react'

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
            <Typography variant={'h5'}>
              <Trans>Delete</Trans> {symbol}
            </Typography>
            <Chip label={chain_id} color="primary" />
          </Stack>
        </DialogTitle>
        <DialogContent>
          {/* <Typography variant="body1">
            Delete Token: <strong>{symbol}</strong> ({address && shortenAddress(address)})
          </Typography> */}

          <Typography variant="subtitle2">
            <Trans>Enter private key for verifying</Trans>
          </Typography>

          <DeleteTokenForm onSubmit={onSubmit} />

          <Typography variant="subtitle2" sx={{ maxWidth: '400px', mt: 2 }}>
            <Trans>
              Notice: Please use the private key of the test account. Otherwise there is a risk that the funds will be
              stolen!
            </Trans>
          </Typography>
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
