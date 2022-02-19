import { usePopTip } from '@/state/application/hooks'
import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function PopTips() {
  const [popTip, updatePopTip] = usePopTip()

  return (
    <Snackbar
      open={popTip.open}
      autoHideDuration={popTip.autoHideDuration}
      onClose={() => updatePopTip({ ...popTip, open: !open })}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={() => updatePopTip({ ...popTip, open: !open })} severity={popTip.severity} sx={{ width: '100%' }}>
        {popTip.message}
      </Alert>
    </Snackbar>
  )
}
