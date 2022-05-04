import { Dialog, DialogContent, DialogTitle, Paper, Typography } from '@mui/material'
import CreateTokenForm from './CreateTokenForm'
import { Trans } from '@lingui/macro'
import React from 'react'

export default function CreateDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (values: any) => void
}) {
  return (
    <Paper>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Trans>Create</Trans>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ maxWidth: '400px' }}>
            <Trans>
              Notice: Please use the private key of the test account. Otherwise there is a risk that the funds will be
              stolen!
            </Trans>
          </Typography>
          <CreateTokenForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
