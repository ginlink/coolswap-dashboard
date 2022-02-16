import { Dialog, DialogContent, DialogTitle, Grid, Paper, Typography } from '@mui/material'
import CreateTokenForm from './CreateTokenForm'
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
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ maxWidth: '400px' }}>
            Notice: Please use the private key of the test account. Otherwise there is a risk that the funds will be
            stolen!
          </Typography>
          <CreateTokenForm onSubmit={onSubmit} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </Paper>
  )
}
