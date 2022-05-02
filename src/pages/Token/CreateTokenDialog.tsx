import { Dialog, DialogContent, DialogTitle, Paper, Typography } from '@mui/material'
import React from 'react'
import DeployTokenForm from './DeployTokenForm'

export default function CreateTokenDialog({
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
        <DialogTitle>Create Token</DialogTitle>
        <DialogContent
          sx={{
            minWidth: ['300px', '420px'],
          }}
        >
          {/* <Typography variant="subtitle2" sx={{ maxWidth: '400px' }}>
            Notice: Please use the private key of the test account. Otherwise there is a risk that the funds will be
            stolen!
          </Typography> */}
          <DeployTokenForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
