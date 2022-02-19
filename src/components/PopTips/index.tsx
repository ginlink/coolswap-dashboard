import { Alert, AlertColor, Snackbar } from '@mui/material'
import React, { useState } from 'react'

export default function PopTips() {
  const [messageBoxOpen, setMessageBoxOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [autoHideDuration, setAutoHideDuration] = useState(3000)
  const [severity, setSeverity] = useState<AlertColor>('success')

  return (
    <Snackbar
      open={messageBoxOpen}
      autoHideDuration={autoHideDuration}
      onClose={() => setMessageBoxOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={() => setMessageBoxOpen(false)} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
