import { Dialog, DialogContent, DialogTitle, Paper, Typography } from '@mui/material'
import React from 'react'
import DeleteTokenForm from './DelteTokenForm'

export default function DeleteDialog({
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
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
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
